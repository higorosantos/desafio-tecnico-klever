import { Router } from "express";
import TopCoinController from "../controller/topcoin.controller";

const router:Router = Router();

const topCoinController = new TopCoinController();

router.get('/getTopCoins', (request, respone)=> topCoinController.getTopCoins(request, respone));


export default router;