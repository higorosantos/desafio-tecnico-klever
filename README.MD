# API de Criptomoedas com WebSocket

Este projeto é uma API REST com suporte a WebSocket para monitoramento de criptomoedas em tempo real, utilizando dados da CoinGecko e Context Layer.

## Tecnologias Utilizadas

- **Backend**: Node.js com TypeScript
- **Framework**: Express.js
- **WebSocket**: Biblioteca WS
- **Cache**: Redis
- **Containerização**: Docker e Docker Compose

## Bibliotecas Principais

- `express`: Framework web para Node.js
- `ws`: Implementação de WebSocket
- `ioredis`: Cliente Redis para Node.js
- `axios`: Cliente HTTP para requisições
- `node-cron`: Agendamento de tarefas
- `cors`: Middleware para CORS
- `@grpc/grpc-js` Implementação GRPC

## Pré-requisitos
- Git
- Docker
- Docker Compose

## Configuração

1. Clone o repositório
2. Crie altera `.env` na raiz do projeto alterando as seguintes variáveis:
```env
COINGECKO_API_KEY=sua_chave_api_coingecko
CONTEXT_LAYER_API_KEY=sua_chave_api_context_layer
```

## Iniciando o Projeto

1. Execute o comando para iniciar os containers:
```bash
docker-compose up -d
```

2. A API estará disponível em:
   - API REST: http://localhost:8080/api
   - WebSocket: ws://localhost:8080
   - GRPC : http://localhost:50051

## Endpoints da API

### Obter Top Moedas
```
GET http://localhost:8080/api/getTopCoins
```

Parâmetros de Query:
- `currency` (opcional): Moeda para conversão (ex: USD, EUR, BRL)

Exemplo de resposta:
```json
{
  "data": [
    {
      "id": "bitcoin",
      "name": "Bitcoin",
      "symbol": "btc",
      "currency": "USD",
      "price": 554709,
      "market_cap": 11017427589938
    }
  ]
}
```

## WebSocket

Conecte-se ao WebSocket em `ws://localhost:8080` para receber atualizações em tempo real.

Exemplo de mensagem recebida:
```json
{
    "event": "updatedTopCoins",
    "data": [
        {
            "id": "bitcoin",
            "name": "Bitcoin",
            "symbol": "btc",
            "currency": "USD",
            "price": 98034,
            "market_cap": 1946497890743
        },
    ]
}
```


## GRPC

Conecte-se ao servidor em `http://localhost:50051`.
Importe o .proto que esta dentro de grpc/proto/topcoin.proto.
Execute a função GetTopCoins.

Exemplo de mensagem recebida:
```json
{
    "coins": [
        {
            "id": "bitcoin",
            "name": "Bitcoin",
            "symbol": "btc",
            "currency": "USD",
            "price": 97834,
            "market_cap": 1943127015546
        },
    ]
}
```

## Estrutura do Projeto

```
.
├── src/
│   ├── __tests__/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── grpc/
│   ├── model/
│   ├── routes/
│   ├── routes/
│   ├── service/
│   ├── types/
│   ├── utils/
│   └── websocket/
│   ├── main.ts
│   ├── app.ts
├── docker-compose.yaml
├── Dockerfile
└── package.json
```

## Cache

O projeto utiliza Redis como banco de dados para cache, otimizando as requisições à API da CoinGecko e reduzindo o tempo de resposta.

## Desenvolvimento

Para desenvolvimento local:

1. Instale as dependências:
```bash
npm install
```

2. Execute em modo desenvolvimento:
```bash
npm run dev
```

## Testes

Para executar os testes:
```bash
npm test
```
