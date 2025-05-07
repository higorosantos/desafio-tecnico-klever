import  Express, { Application }  from "express";
import httpError from "./middleware/http.error";
import router from "./routes/coin.routes";


const app:Application = Express();
app.use(Express.json());
app.use(router);
app.use(httpError);

export default app;