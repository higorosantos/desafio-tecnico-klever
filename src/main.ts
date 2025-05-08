import app from './app';
import cron  from 'node-cron';
import TopCoinService from './service/topcoin.service';
import SocketServer from './websocket/webSocketServer';
import http from 'http';
import TopCoin from './model/topcoin.model';
import { GrpcServer } from './grpc/grpcServer';

const API_PORT = process.env.API_PORT || 3000;

const httpServer =  http.createServer(app);
const topCoinService:TopCoinService = new TopCoinService();
const socketServer:SocketServer = new SocketServer(httpServer);
const grpcServer = new GrpcServer();

//Iniciando o Agendador
cron.schedule('* * * * *', async ()=> {
    try {
        await topCoinService.updateRedis();
        const data:TopCoin[] = await topCoinService.getTopCoins("USD")
        socketServer.emitToAll("updatedTopCoins", data)
        console.log("Redis Atualizado!")
    }catch(e){
        console.error("Erro ao atualizar o cache do redis!", e);
    }
   
})


//Iniciando WS

//Iniciando GRPC
grpcServer.start();

//Iniciando a API 
httpServer.listen(API_PORT, () => {
    console.log(`API + WebSocket rodando na porta ${API_PORT}`);
  });