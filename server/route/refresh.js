const express = require('express');
const router = express.Router();
const getConnection = require('../db');
const jwt = require('jsonwebtoken');
const { getAccessToken, verify, refreshVerify} = require('../utils/jwtUtil');
const connection = getConnection();

router.route('/')
    .get(async (req, res) => {
        try{
            const token = req.headers.token;
            const refreshToken = req.cookies.refreshToken
            const authResult = verify(token)
            let decoded;
            if(token){
                decoded = jwt.decode(token);
            } else {
                console.error('token not exist');
                return res.status(401).send({
                    // return res.status(200).send({
                    success: false,
                    message: '로그인 후 이용해주세요.'
                })
            }
            if(decoded === null){
                console.error('decode is failed');
                return res.status(401).json({
                    // return res.status(200).send({
                    success: false,
                    // message: '세션이 만료되었습니다. 로그인 후 이용해주세요.'
                    message: '로그인 후 이용해주세요.'
                })
            }
            const refreshResult = await refreshVerify(refreshToken, decoded.id);
            if(refreshResult){
                const user = { 
                    id: decoded.id,
                    name: decoded.name,
                    phone: decoded.phone
                }
                const newAccessToken = getAccessToken(user);
                return res.json({success: true, message: 'new Feed', token: newAccessToken})
            } else {
                // return res.status(200).send({
                return res.status(401).send({
                success: false,
                message: '세션이 만료되었습니다. 로그인 후 이용해주세요.'
            })

            }
        } catch(err){
            console.log(err);
            return res.json({success: false, message: 'false'})
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }


    })

module.exports = router;