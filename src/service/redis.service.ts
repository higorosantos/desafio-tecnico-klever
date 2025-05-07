import redisClient from "../config/redis";

class RedisService {


    async set<T>(key: string, data:T){

        try {

            await redisClient.set(key, JSON.stringify(data));

        }catch(e){
            console.error("Erro ao salvar no cache: ", e);
        }
        
    }

   async getAll<T>(key: string){
        try{

            const data = await redisClient.get(key);
            return data ? JSON.parse(data) as T : null;

        }catch(e){
            console.error("Erro ao buscar informações no cache: ", e);
        }
    }

}


export default RedisService;