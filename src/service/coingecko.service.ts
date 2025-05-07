import axios from 'axios';



class CoinGeckoService {
    private readonly COINGECKO_API_URL = `${process.env.API_COIN_BASE_URL}/coins/markets`;

    async getCoins(quantidade: number, currency: string): Promise<any> {

        const params = {
            "vs_currency": currency,
            "order": "market_cap_desc",
            "per_page": quantidade
        };

        const headers = {
            "x-cg-api-key": process.env.API_COIN_TOKEN
        }


        const response = await axios.get(this.COINGECKO_API_URL, { params, headers });
        return response.data;


    }
}

export default CoinGeckoService;