import { WebSocketServer, WebSocket } from 'ws';
import { Server as HttpServer } from 'http';

class SocketServer {
  private wsServer: WebSocketServer;
  private clients: Set<WebSocket> = new Set();

  constructor(server: HttpServer) {
    this.wsServer = new WebSocketServer({ server });

    this.wsServer.on('connection', (socket: WebSocket) => {
      console.log('Cliente conectado');
      this.clients.add(socket);

      socket.on('close', () => {
        console.log('Cliente desconectado');
        this.clients.delete(socket);
      });
    });
  }

  public init() {
    console.log('Servidor WebSocket iniciado!');
  }

  public emitToAll(event: string, data: any) {
    const payload = JSON.stringify({ event, data });
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    }
  }
}

export default SocketServer;
