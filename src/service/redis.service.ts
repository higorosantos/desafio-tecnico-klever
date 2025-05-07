import redisClient from "../config/redis";

class RedisService {


    async set<T>(key: string, data:T, ttl:number){

        try {

            await redisClient.set(key, JSON.stringify(data), 'EX', ttl);

        }catch(e){
            throw new Error("Erro interno!")
        }
        
    }

   async getAll<T>(key: string){
        try{

            const data = await redisClient.get(key);
            return data ? JSON.parse(data) as T : null;

        }catch(e){
            throw new Error("Erro interno!")
        }
    }

}


export default RedisService;