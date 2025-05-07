import axios from 'axios';

class TopCoinService {

    constructor(){}

    async getTopCoinFromApi() {
    
        const url = `${process.env.API_COIN_BASE_URL}${process.env.API_COIN_ENDPOINT}`
        
        const coinList = await axios.get(url, {params: { "vs_currency": "USD","order":"market_cap_desc","per_page":10 } , headers: { "x-cg-api-key" : process.env.API_COIN_TOKEN}}).then((response)=> {
            return response.data;
        }).catch(()=> {

        })

        return coinList; 
    }
}


export default TopCoinService;