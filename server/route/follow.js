const express = require('express');
const router = express.Router();
const getConnection = require('../db');
const authJWT = require('../middleware/authJWT');
const { FEED_PATH } = require('../constants/path');
const { CAT_FEED } = require('../constants/category');
const path = require('path')


router.route('/:uid')
    .get(authJWT, async (req, res) => {
        let query;
        if(req.headers.type === 'follower'){
            query = 'select * from tbl_follow where followerId = ? order by followedAt desc'
        } else {
            query = 'select * from tbl_follow where followingId = ? order by followedAt desc'
        }
        const connection = await getConnection();
        try{    
            const [result] = await connection.query(query, [req.params.id]);
            res.json({ success: true, follow: result});
        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: 'follow err'});
        } 
    })
    .post(authJWT, async (req, res) => {
        let query = 'insert into tbl_follow (followerId, followingId) values (?, ?)'
        const connection = await getConnection();
        try{    
            await connection.query(query, [req.params.uid ,req.body.followingId]);
            res.json({ success: true, message: '작성되었습니다.'});
            

        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: '게시글 작성에 실패했습니다.'});
        } 
    })
    .delete(authJWT, async (req, res) => {
        let query = 'delete from tbl_follow where followerId = ? and followingId = ?'
        const connection = await getConnection();
        console.log(req.body)
        try{    
            await connection.query(query, [req.params.uid ,req.body.followingId]);
            res.json({ success: true, message: '언팔로우.'});

        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: '게시글 작성에 실패했습니다.'});
        } 
    })

module.exports = router;

