const redis = require('redis');

// const redisClient = redis.createClient(process.env.REDIS_PORT);
const getRedisClient = async() => {
    const client = redis.createClient() // 로컬포트로 연결
    .on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    return client;
} 

module.exports = getRedisClient;