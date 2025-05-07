import {Request, Response} from "express";
import TopCoinService from "../service/topcoin.service";

class TopCoinController {

    topCoinService: TopCoinService;

    constructor(){
        this.topCoinService = new TopCoinService();
    }
    
    async getTopCoins(request:Request, response:Response):Promise<any>{
        const { currency } = request.query;
        const coinList = await this.topCoinService.getTopCoinFromApi();

        response.status(200).json(coinList);
    }
}


export default TopCoinController;