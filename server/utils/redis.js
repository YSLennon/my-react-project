const redis = require('redis');

let client;
// const redisClient = redis.createClient(process.env.REDIS_PORT);
const getRedisClient = async() => {
    if(!client){
        console.log('redis client is opened')
        client = redis.createClient() // 로컬포트로 연결
        .on('error', err => console.log('Redis Client Error', err));
        await client.connect();
    }
    return client;
} 

module.exports = getRedisClient;