declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            API_COIN_BASE_URL:string,
            API_COIN_ENDPOINT:string,
            API_COIN_TOKEN:string,
            API_PORT: number;
            TESTE: string;
            REDIS_TTL: number;
        }
    }
}
