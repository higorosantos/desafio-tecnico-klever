declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            API_COIN_BASE_URL:string,
            API_CONVERT_CURRENCY:string,
            API_COIN_TOKEN:string,
            PI_CONVERT_CURRENCY_TOKEN: string,
            API_PORT: number;
            REDIS_HOST: string;
            REDIS_TTL: number;
            REDIS_PORT: number;
            REDIS_PASSWORD:string;
        }
    }
}