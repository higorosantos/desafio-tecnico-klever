import  Express, { Application }  from "express";
import router from "./routes/coin.routes";


const app:Application = Express();
app.use(Express.json());
app.use(router);

export default app;