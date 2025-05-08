import  Express, { Application }  from "express";
import httpError from "./middleware/http.error";
import router from "./routes/coin.routes";
import cors from "cors";


const app:Application = Express();

app.use(cors());
app.use(Express.json());
app.use('/api', router);
app.use(httpError);

export default app;