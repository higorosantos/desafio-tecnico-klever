import { CoinGeckoResponse } from "../model/CoinGecko/response.model";
import TopCoin from "../model/topcoin.model";
import CoinGeckoService from "./coingecko.service";
import CurrencyService from "./currency.service";
import RedisService from "./redis.service";

class TopCoinService {

    coinGeckoService:CoinGeckoService;
    redisService:RedisService;
    currencyService:CurrencyService;

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


    private async getCoinFromCacheOrApi(){
        const redisData = await this.redisService.getAll<CoinGeckoResponse[]>("topCoins");

        if(redisData){
            return redisData;
        }

        //SE NÃO TIVER NO REDIS
        const topCoins = await this.coinGeckoService.getCoins(10, "USD");

        this.redisService.set<TopCoin[]>("topCoins", topCoins, this.REDIS_TTL);

        return topCoins;

    }

    private async formatData(reponseApi:CoinGeckoResponse[], currency:string):Promise<TopCoin[]>{ 


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