const express = require('express');
const router = express.Router();
const getConnection = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../auth')

const connection = getConnection();

router.route('/')
    .get(async (req, res) => {
        try{
            const connection = await getConnection();
            // const {id, pwd, name, phone} = req.body;
            const query = 'SELECT * FROM TBL_USER'

            const [results] = await connection.query(query)
            res.json({success: true, user: results});
        } catch(err){
            res.json({success: false, message: err});

        }        
    })
    .post(async (req, res) => {
        try{
            const connection = await getConnection();
            const {id, pwd, name, phone} = req.body;
            let query = 'SELECT * FROM TBL_USER WHERE ID = ?';

            const [results] = await connection.query(query, [id])
            if(results.length > 0){
                res.json({success: false, message: '이미 가입된 아이디입니다.'})
                return;
            }
            
            query = 'INSERT INTO TBL_USER VALUES (?, ?, ?, ?)';
            
            const pwdHash = await bcrypt.hash(pwd,saltRounds);
            console.log('hashPwd: ',pwdHash);
    
            await connection.query(query, [id, pwdHash, name, phone])
            res.json({success: true, message: '회원가입에 성공했습니다.'})

        } catch(err){
            res.json({success: false, message: err});

        }
    })
router.route('/:id')
    .post(async (req, res) => {
        try{
            const connection = await getConnection();
            const {pwd} = req.body;
            const query = 'SELECT * FROM TBL_USER WHERE ID = ?'
            const [results] = await connection.query(query,[req.params.id])
            const user = results[0]
            if(results.length < 1) {
                res.json({success: false, message: '존재하지 않는 아이디입니다. 아이디를 확인해주세요.'});
                return;
            }
            const checkPwd = await bcrypt.compare(pwd, user.pwd);
            if(checkPwd){
                console.log(user)// 로그인 성공

                console.log(JWT_KEY)
                const token = await jwt.sign({userId: user.id, name: user.name, phone: user.phone}, JWT_KEY, {expiresIn: '5m'});
                res.json({success: true, message: '로그인 되었습니다.', token: token});
            } else {
                console.log('login 실패')
            }
        } catch(err){
            res.json({success: false, message: err});
        }
    })

    module.exports = router;