import axios from 'axios';
import CurrencyConvertResponse from '../model/CurrencyLayer/response.model';
import HttpException from '../utils/HttpException';


class CurrencyService {
    private readonly CONVERT_CURRENCY_API_URL = `${process.env.API_CONVERT_CURRENCY}/convert`;

    async getQuoteRate(currencyFrom: string, currencyTo: string): Promise<number> {

        const params = {
            "access_key": process.env.API_CONVERT_CURRENCY_TOKEN,
            "from": currencyFrom,
            "to": currencyTo,
            "amount": 1
        };

        const response = await axios.get<CurrencyConvertResponse>(this.CONVERT_CURRENCY_API_URL, { params });

        if (response.data.success) {
            return response.data.info.quote;

        } else {

            throw new HttpException(`Falha ao converter moeda para ${currencyTo}`, response.data.error?.code || 400);

        }

    }
}

export default CurrencyService;