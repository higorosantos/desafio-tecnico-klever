import redisClient from "../config/redis";

class RedisService {


    async set<T>(key: string, data:T, ttl:number){

        try {

            await redisClient.set(key, JSON.stringify(data), 'EX', ttl);

        }catch(e){
            throw new Error("Erro ao criar informações no redis!")
        }
        
    }

   async get<T>(key: string){
        try{

            const data = await redisClient.get(key);
            return data ? JSON.parse(data) as T : null;

        }catch(e){
            throw new Error("Erro ao extrair informações do redis!")
        }
    }

    async del<T>(key:string){
        try {
            const dataExist = await this.get<T>(key);
            if(dataExist){
                await redisClient.del(key);
            }
           
        }catch(e){
            throw new Error("Erro ao deletar cache no redis!");
        }
    }

}


export default RedisService;