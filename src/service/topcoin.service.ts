import { CoinGeckoResponse } from "../model/CoinGecko/response.model";
import TopCoin from "../model/topcoin.model";
import CoinGeckoService from "./coingecko.service";
import CurrencyService from "./currency.service";
import RedisService from "./redis.service";

class TopCoinService {

    private coinGeckoService:CoinGeckoService;
    private redisService:RedisService;
    private currencyService:CurrencyService;

    private REDIS_TTL = process.env.REDIS_TTL;

    constructor(){
        this.coinGeckoService = new CoinGeckoService();
        this.redisService = new RedisService();
        this.currencyService = new CurrencyService();

    }

    async getTopCoins(currency:string): Promise<TopCoin[]>{
    
        const topCoins = await this.getCoinFromCacheOrApi();        
        
        if (!topCoins) return [];

        return this.formatData(topCoins, currency); 
    }


    async updateRedis(){

        try {
            const topCoins:CoinGeckoResponse[] = await this.coinGeckoService.getCoins(10, "USD");

            if(topCoins.length == 0) return [];
    
            await this.redisService.set("topCoins", topCoins, this.REDIS_TTL);

        }catch(e){
            throw Error("Falha ao atualizar o cache");
        }
      

    }

    private async getCoinFromCacheOrApi(){
        const redisData = await this.redisService.get<CoinGeckoResponse[]>("topCoins");

        if(redisData){
            return redisData;
        }

        //SE NÃO TIVER NO REDIS
        const topCoins = await this.coinGeckoService.getCoins(10, "USD");

        this.redisService.set<TopCoin[]>("topCoins", topCoins, this.REDIS_TTL);

        return topCoins;

    }

    private async formatData(reponseApi:CoinGeckoResponse[], currency:string):Promise<TopCoin[]>{ 

        if(!currency) currency = "USD";

        const quoteRate:number = await this.currencyService.getQuoteRate("USD", currency.toUpperCase());

        const formatted: TopCoin[] = reponseApi.map((coin: CoinGeckoResponse) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            currency: currency.toUpperCase(),
            price: coin.current_price * quoteRate,
            market_cap: coin.market_cap * quoteRate,
          }));

          return formatted;
        
    }

}


export default TopCoinService;