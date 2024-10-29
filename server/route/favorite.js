const express = require('express');
const router = express.Router();
const getConnection = require('../db');
const authJWT = require('../middleware/authJWT');
const { FEED_PATH } = require('../constants/path');
const { CAT_FEED } = require('../constants/category');
const path = require('path')


router.route('/:id')
    .post(authJWT, async (req, res) => {
        console.log('hi')
        let query = 'insert into tbl_follow (followerId, followingId) values (?, ?)'
        const connection = await getConnection();
        try{    
            await connection.query(query, [req.params.id ,req.body.followingId]);
            res.json({ success: true, message: '작성되었습니다.'});
            

        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: '게시글 작성에 실패했습니다.'});
        } 
    })

module.exports = router;

