const express = require('express');
const router = express.Router();
const getConnection = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('../utils/jwtUtil');
const authJWT = require('../middleware/authJWT');
const getRedisClient = require('../utils/redis');

const connection = getConnection();

router.route('/')
    .get(async (req, res) => { // 미정
        try{
            console.log(req.cookies);
            res.json({success: true});
        } catch(err){
            res.json({success: false, message: err});

        }        
    })
    .post(async (req, res) => { // 회원가입
        try{
           const refreshToken = 'why?'
            res.cookie('refreshToken', refreshToken, {
                // httpOnly: true,
                // secure: false, // true 시 https에서만 전송
                // maxAge: 14 * 24 * 60 * 60 * 1000, // 쿠키 만료 시간: 14일
            });

            res.cookie('hello', 'refreshToken', {
                httpOnly: true,
                secure: false, // true 시 https에서만 전송
                maxAge: 14 * 24 * 60 * 60 * 1000, // 쿠키 만료 시간: 14일

            });

            res.json({success: true, message: '쿠키내놔...'});

        } catch(err){
            res.json({success: false, message: err});

        }
    })
    

module.exports = router;