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
        const connection = await getConnection();

        try{
            // const {id, pwd, name, phone} = req.body;
            const query = 'SELECT * FROM tbl_user'

            const [results] = await connection.query(query)
            res.json({success: true, user: results});
        } catch(err){
            res.json({success: false, message: err});
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }        
    })
    .post(async (req, res) => { // 회원가입
        const connection = await getConnection();

        try{
            const {id, pwd, name, phone} = req.body;
            let query = 'SELECT * FROM tbl_user WHERE ID = ?';
            

            const [results] = await connection.query(query, [id])
            if(results.length > 0){
                res.json({success: false, message: '이미 가입된 아이디입니다.'})
                return;
            }
            query = 'INSERT INTO tbl_user VALUES (?, ?, ?, ?)';
            
            const pwdHash = await bcrypt.hash(pwd,saltRounds);
            console.log('hashPwd: ',pwdHash);
    
            await connection.query(query, [id, pwdHash, name, phone])
            res.json({success: true, message: '회원가입에 성공했습니다.'})

        } catch(err){
            res.json({success: false, message: err});
        }finally {
            connection.release(); // 반드시 커넥션 반환
        }
    })
router.route('/:id')
    .get( async (req, res) => { // 로그아웃
        const token = req.headers.token;
        try{
            const redisClient = await getRedisClient()
            const userId = req.params.id;
            await redisClient.del(userId);
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: false, 
            });
            res.json({success: true, message: '로그아웃 되었습니다.'})
        } catch(err){
            res.json({success: false, message: err});
        } 
    })
    .post( async (req, res) => { // 로그인
        const connection = await getConnection();

        try{
            const {pwd} = req.body;
            const query = 'SELECT * FROM tbl_user WHERE ID = ?'
            const [results] = await connection.query(query,[req.params.id])
            console.log(results);

            const user = results[0]

            if(results.length < 1) {
                res.json({success: false, type:'id', message: '존재하지 않는 아이디입니다. 아이디를 확인해주세요.'});
                return;
            }
            const checkPwd = await bcrypt.compare(pwd, user.pwd);
            if(checkPwd){
                const accessToken = jwt.getAccessToken(user);
                const refreshToken = jwt.getRefreshToken();
                const redisClient = await getRedisClient()
                await redisClient.set(user.id, refreshToken);

                // client에 accessToken 돌려줌

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false, // true 시 https에서만 전송
                    maxAge: 14 * 24 * 60 * 60 * 1000, // 쿠키 만료 시간: 14일
                });

                res.json({
                    success: true,
                    message: '로그인 되었습니다',
                    accessToken,
                });

            } else {
                res.json({
                    success: false,
                    type:'pwd',
                    message: '비밀번호가 일치하지 않습니다',
                });
            }
        } catch(err){
            console.log(err);
            res.json({success: false, message: err+123});
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }
    })

module.exports = router;