
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const redisClient = require('../utils/redis');
const getRedisClient = require('../utils/redis');

module.exports = {
    getAccessToken: (user) => {
        const payload = {
            id: user.id,
            name: user.name,
            phone: user.phone,
        }
        return jwt.sign(payload, JWT_KEY, { expiresIn:'30m'});
    },
    verify: (token) => {
        let decoded = null;
        try{
            decoded = jwt.verify(token, JWT_KEY);
            return {
                success: true,
                id: decoded.id,
                name: decoded.name,
                phone: decoded.phone,
            };
        } catch (err) {
            return{
                success: false,
                message: err.message,
            }
        }
    },
    getRefreshToken: () => {
        return jwt.sign({}, JWT_KEY, {expiresIn: '14d'});
    },
    refreshVerify: async (token, id) => { // refresh token 검증
        const redisClient = await getRedisClient();
        let result = false;
        try{
            const data = await redisClient.get(id);
            if (token === data){
                try {
                    jwt.verify(token, JWT_KEY);
                    return true;
                } catch (err) {}
            } 
        } catch (err){
            console.log(err)
        }
        return result;
    },
     
    
}