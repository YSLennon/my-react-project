const { verify } = require('../utils/jwtUtil');

const authJWT = (req, res, next) => {

    const token = req.headers.token

    if(token) {
        const cookies = req.cookies

        const result = verify(token);
        if(result.success){
            req.id = result.id;
            req.name = result.name;
            req.phone = result.phone;
            next();
        } else {
            res.status(401).json({
                success: false,
                message: result.message,
            })
        };
    } else {
        res.status(401).send({
            success: false,
            // message: result.message,
        })
    
    }
}

module.exports = authJWT;