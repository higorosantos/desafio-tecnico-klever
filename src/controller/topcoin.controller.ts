import {Request, Response} from "express";
import TopCoinService from "../service/topcoin.service";
import TopCoin from "../model/topcoin.model";

class TopCoinController {

    topCoinService: TopCoinService;

    constructor(){
        this.topCoinService = new TopCoinService();
    }
    
    async getTopCoins(request:Request, response:Response):Promise<any>{
        const { currency } = request.query;
        const coinList:TopCoin[] = await this.topCoinService.getTopCoins(currency as string);

        response.status(200).json(coinList);
    }
}


export default TopCoinController;