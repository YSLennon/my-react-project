
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

module.exports = {
    getAccessToken: (user) => {
        const payload = {
            id: user.id,
            name: user.name,
            phone: user.phone,
        }
        return jwt.sign(payload, JWT_KEY, { expiresIn:'10s'});
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
    refreshVerify: async (token, id, redisClient) => { // refresh token 검증
        /* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
           promisify를 이용하여 promise를 반환하게 해줍니다.*/
        const getAsync = promisify(redisClient.get).bind(redisClient);
        let result = false;
        try{
            const data = await getAsync(id);
            if (token === data){
                try {
                    jwt.verify(token, JWT_KEY);
                    return true;
                } catch (err) {}
            } 
        } catch (err){}
        return result;
    },
     
    
}