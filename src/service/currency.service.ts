import axios from 'axios';
import CurrencyConvertResponse from '../model/CurrencyLayer/response.model';


class CurrencyService {
    private readonly CONVERT_CURRENCY_API_URL = `${process.env.API_CONVERT_CURRENCY}/convert`;

    async getQuoteRate(currencyFrom: string, currencyTo: string): Promise<number | null> {

        const params = {
            "access_key": process.env.API_CONVERT_CURRENCY_TOKEN,
            "from": currencyFrom,
            "to": currencyTo,
            "amount": 1
        };

        try {

            const response = await axios.get<CurrencyConvertResponse>(this.CONVERT_CURRENCY_API_URL, { params });

            if (response.status === 200) {
        
                if (response.data.success){
                    return response.data.info.quote;

                }else {

                    return null;

                }
                    
            } else {
                console.error(`Erro ao converter moeda: ${response.status}`);
                return null;
            }

        } catch (error) {
            console.error('Erro ao fazer requisição para s CoinGecko:', error);
            return null;
        }
    }
}

export default CurrencyService;