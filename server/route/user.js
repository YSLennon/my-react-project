const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path')


router.route('/')
    .get((req, res) => {
        const query = 'SELECT * FROM TBL_USER'
        connection.query(query, (err, results) => {
            if(err){
                // res.status(500).send(err);
                res.json({success: false, message: err});
            }
            res.json({success: true, user: results})
        })
    })
    .post(async (req, res) => {
        const query = 'INSERT INTO TBL_USER VALUES (?, ?, ?, ?)';
        const {id, pwd, name, phone} = req.body;
        
        const pwdHash = await bcrypt.hash(pwd,saltRounds);
        console.log('hashPwd: ',pwdHash);

        connection.query(query, [id, pwdHash, name, phone], (err, results) => {
            if(err){
                // res.status(500).send(err);
                res.json({success: false, message: err});
            }
            res.json({success: true, message: '회원가입에 성공했습니다.'})
        })
    })
router.route('/:id')
    .get((req, res) => {
        const query = 'SELECT * FROM TBL_USER WHERE ID = ?'
        const {pwd} = req.body;
        connection.query(query, [req.params.id], async (err, results) => {
            if(err){
                // res.status(500).send(err);
                res.json({success: false, message: err});
            }
            if(results.length <= 0){
                res.json({success: false, message: '존재하지 않는 아이디입니다.'})  
            } else {
                const user = results[0];
                const checkPwd = await bcrypt.compare(pwd, user.pwd);
                if(checkPwd){
                    console.log(path)
                    // const token = 
                }
            }
            
        })

    })