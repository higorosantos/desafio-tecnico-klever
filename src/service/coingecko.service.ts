import axios from 'axios';


class CoinGeckoService {
    private readonly COINGECKO_API_URL = `${process.env.API_COIN_BASE_URL}/coins/markets`;

    async getCoins(quantidade: number, currency: string): Promise<any | null> {

        const params = {
            "vs_currency": currency,
            "order": "market_cap_desc",
            "per_page": quantidade
        };

        const headers = {
            "x-cg-api-key": process.env.API_COIN_TOKEN
        }

        try {

            const response = await axios.get(this.COINGECKO_API_URL, { params, headers });

            if (response.status === 200) {
                return response.data;
            } else {
                console.error(`Erro na API do CoinGecko: ${response.status}`);
                return null;
            }

        } catch (error) {
            console.error('Erro ao fazer requisição para s CoinGecko:', error);
            return null;
        }
    }
}

export default CoinGeckoService;