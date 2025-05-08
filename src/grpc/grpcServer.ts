import path from 'path';
import * as grpc from '@grpc/grpc-js';
import TopCoinService from '../service/topcoin.service';
import TopCoin from '../model/topcoin.model';

import  * as protoLoader from '@grpc/proto-loader';


const PROTO_PATH = path.join(__dirname, './proto/topcoin.proto');

export class GrpcServer {
  private server: grpc.Server;
  private topCoinService: TopCoinService;
  private proto: any;

  constructor() {
    this.server = new grpc.Server();
    this.topCoinService = new TopCoinService();
    this.proto = this.loadProto();
    this.defineServices();
  }

  private loadProto() {

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    return grpc.loadPackageDefinition(packageDefinition);
  }

  private defineServices() {
    this.server.addService(this.proto.TopCoinService.service, {
      GetTopCoins: this.getTopCoinsHandler.bind(this),
    });
  }

  private async getTopCoinsHandler(
    call: grpc.ServerUnaryCall<{ currency: string }, { coins: TopCoin[] }>,
    callback: grpc.sendUnaryData<{ coins: TopCoin[] }>
  ) {
    const { currency } = call.request;

    try {
      const coins = await this.topCoinService.getTopCoins(currency);
      callback(null, { coins });
    } catch (err: any) {
      console.error('Erro ao buscar top coins:', err.message);
      callback({
        code: grpc.status.INTERNAL,
        message: 'Erro ao buscar top coins',
      });
    }
  }

  public start(port: number = 50051) {
    this.server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, bindPort) => {
        if (err) {
          console.error('Erro ao iniciar gRPC server:', err);
          return;
        }
        console.log(`Servidor GRPC Iniciado no http://0.0.0.0:${bindPort}`);
      }
    );
  }
}
