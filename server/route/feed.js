const express = require('express');
const router = express.Router();
const multer = require('multer');
const getConnection = require('../db');
const authJWT = require('../middleware/authJWT');
const { FEED_PATH } = require('../constants/path');
const { CAT_FEED } = require('../constants/category');
const path = require('path')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Multer 설정: 저장할 경로 및 파일 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FEED_PATH); // 저장할 폴더
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`
        cb(null, uniqueSuffix+ path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.route('/')
    .get(authJWT, async (req, res) => {
        const connection = await getConnection();
        try{
            const isExplore = req.headers.feed === 'explore' || req.headers.feed === undefined
            let query = isExplore? `SELECT feedNo, f.id, text, name, DATE_FORMAT(createdAt, '%m월%d일') AS createdAt, filename as profile FROM tbl_feed f inner join tbl_user u on f.id = u.id left JOIN tbl_file fi ON f.id = fi.profileId order by feedNo DESC`
             : `SELECT distinct feedNo, f.id, text, name, DATE_FORMAT(createdAt, '%m월%d일') AS createdAt, filename as profile FROM tbl_feed f inner join tbl_user u on f.id = u.id INNER JOIN tbl_follow fo ON f.id = fo.followingId left JOIN tbl_file fi ON f.id = fi.profileId WHERE fo.followerId = '${req.headers.feed}' || f.id = '${req.headers.feed}' order by feedNo DESC`;
            const [feedList] = await connection.query(query);
            query = isExplore? `SELECT boardNo, c.id, content, DATE_FORMAT(c.createdAt, '%m월%d일') AS createdAt, u.name, commentNo from tbl_comment c INNER JOIN tbl_feed f on c.boardno = f.feedNo inner join tbl_user u on c.id = u.id order BY c.commentNo`
             : `SELECT * from tbl_comment c INNER JOIN tbl_feed f on c.boardno = f.feedNo inner join tbl_user u on c.id = u.id INNER JOIN tbl_follow fo ON f.id = fo.followingId WHERE followerId ='${req.headers.feed}' || f.id = '${req.headers.feed}' order BY c.commentNo`
            const [commentList] = await connection.query(query);
            query = isExplore? 'select * from tbl_file order by fileNo desc'
             : `select * from tbl_file f INNER JOIN tbl_feed fe ON f.boardNo = fe.feedNo inner JOIN tbl_follow on fe.id = followingId WHERE followerId = '${req.headers.feed}' || fe.id = '${req.headers.feed}'  order by fileNo desc`;
            const [fileList] = await connection.query(query);
    
            
            console.log(feedList.length)
            if(feedList.length !== 0){
                feedList.forEach(item => item.profile = item.profile?`${req.protocol}://${req.get('host')}/uploadsProfile/${item.profile}`:null);
            }
            console.log(11111)
            console.log(feedList.length)
    
            let images;
            if(fileList.length !== 0){
                images = fileList.reduce((acc, item) => {
                    if(!acc[item.boardNo]){
                        acc[item.boardNo] = []
                    };
                    acc[item.boardNo].push([item.orgName, item.fileType, `${req.protocol}://${req.get('host')}/uploads/${item.filename}`, item.path, item.uploadedAt]);
                    return acc;
                }, {});
            }
    
            let comments;
            if(commentList.length !== 0){
                comments = commentList.reduce((acc, item) => {
                    if(!acc[item.boardNo]){
                        acc[item.boardNo] = []
                    };
                    acc[item.boardNo].push([item.id, item.content, item.name, item.createdAt, item.commentNo]);
                    return acc;
                }, {});
            }
            
            res.json({success: true, message: 'new Feed', images, feedList, comments})    
        } catch(e){
            console.error(e)
            res.json({success: false, message: 'err'})    
        } finally{
            connection.release();
        }
    })
    .post(authJWT, upload.array('uploaded_files', 5), async (req, res) => {
        let query = 'insert into tbl_feed (id, text) values (?, ?)'
        const connection = await getConnection();
        try{    
            const [feedResult] = await connection.query(query, [req.body.id, req.body.text]);
            
            const boardNo = feedResult.insertId;
            if(boardNo){
                query = 'insert into tbl_file (boardNo, orgName, filetype, filename, path, category) values ?'
                const values = req.files.map(item => [boardNo, decodeURIComponent(item.originalname), item.mimetype, item.filename, item.path, CAT_FEED]);
                await connection.query(query, [values]);
                res.json({ success: true, message: '작성되었습니다.'});
            } else {
                res.json({ success: false, message: '게시글 작성에 실패했습니다..'});
            }

        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({success: false, message: '서버 오류가 발생했습니다.'});
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }
    })
    .delete(authJWT, async (req, res) => {
        const connection = await getConnection();

        try{    
            let query = 'delete from tbl_feed where feedNo = ?'
            const [feedResult] = await connection.query(query, [req.body.feedNo]);
            query = 'delete from tbl_comment where boardNo = ?'
            const [deleteComment] = await connection.query(query, [req.body.feedNo]);
            
            res.json({ success: true, message: '삭제되었습니다.'});
            
        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: '게시글 삭제에 실패했습니다.'});
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }
    })

router.route('/:uid')
    .get(authJWT, async (req, res) => {
        const connection = await getConnection();
        try{
            let query = `SELECT feedNo, id, text, DATE_FORMAT(createdAt, '%m월%d일') AS createdAt from tbl_feed where id = ? order by feedNo desc`;
            const [feedList]= await connection.query(query, req.params.uid);
            query = `SELECT boardNo, c.id, content, DATE_FORMAT(c.createdAt, '%m월%d일') AS createdAt, u.name, commentNo from tbl_comment c INNER JOIN tbl_feed f on c.boardno = f.feedNo  join tbl_user u on c.id = u.id WHERE f.id= ? order BY c.commentNo`;
            const [commentList] = await connection.query(query, req.params.uid);
            query = 'select * from tbl_file fi INNER JOIN tbl_feed f ON fi.boardNo = f.feedNo WHERE id = ? ORDER BY fileNo desc';
            const [fileList] = await connection.query(query, req.params.uid);
            let images;
            if(fileList.length !== 0){
                images = fileList.reduce((acc, item) => {
                    if(!acc[item.boardNo]){
                        acc[item.boardNo] = []
                    };
                    acc[item.boardNo].push([item.orgName, item.fileType, `${req.protocol}://${req.get('host')}/uploads/${item.filename}`, item.path, item.uploadedAt]);
                    return acc;
                }, {});
            }
            
            let comments;
            if(commentList.length !== 0){
                comments = commentList.reduce((acc, item) => {
                    if(!acc[item.boardNo]){
                        acc[item.boardNo] = []
                    };
                    acc[item.boardNo].push([item.id, item.content, item.name, item.createdAt, item.commentNo]);
                    return acc;
                }, {});
            }
            
            res.json({success: true, message: 'new Feed', images, feedList, comments})
        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: 'err'});
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }
    })
    .post(authJWT, async (req, res) => { // comment
        let query = 'insert into tbl_comment (boardNo, id, content) values (?, ?, ?)'
        const connection = await getConnection();
        try{    
            const [feedResult] = await connection.query(query, [req.body.boardNo ,req.params.uid, req.body.content]);
            query = `SELECT boardNo, c.id, content, DATE_FORMAT(c.createdAt, '%m월%d일') AS createdAt, u.name, commentNo from tbl_comment c INNER JOIN tbl_feed f on c.boardno = f.feedNo  join tbl_user u on c.id = u.id WHERE f.feedno = ? order BY c.commentNo`
            const [commentList] = await connection.query(query, [req.body.boardNo]);
            
            let comments;
            if(commentList.length !== 0){
                comments = commentList.reduce((acc, item) => {
                    if(!acc[item.boardNo]){
                        acc[item.boardNo] = []
                    };
                    acc[item.boardNo].push([item.id, item.content, item.name, item.createdAt, item.commentNo]);
                    return acc;
                }, {});
            }
            res.json({ success: true, message: '작성되었습니다.', comments});


        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: '댓글 작성에 실패했습니다.'});
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }
    })
    .delete(authJWT, async (req, res) => {
        const connection = await getConnection();
        try{    
            console.log(req.params.uid)
            let query = 'delete from tbl_comment where commentNo = ?'
            const [deleteComment] = await connection.query(query, [req.body.commentNo]);
            query = `SELECT boardNo, c.id, content, DATE_FORMAT(c.createdAt, '%m월%d일') AS createdAt, u.name, commentNo from tbl_comment c INNER JOIN tbl_feed f on c.boardno = f.feedNo  join tbl_user u on c.id = u.id WHERE f.feedno = ? order BY c.commentNo`
            const [commentList] = await connection.query(query, [req.params.uid]);
            
            let comments;
            if(commentList.length !== 0){
                comments = commentList.reduce((acc, item) => {
                    if(!acc[item.boardNo]){
                        acc[item.boardNo] = []
                    };
                    acc[item.boardNo].push([item.id, item.content, item.name, item.createdAt, item.commentNo]);
                    return acc;
                }, {});
            }
            
            res.json({ success: true, message: '삭제되었습니다.', comments});
            
        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: '댓글 삭제에 실패했습니다.'});
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }
    })

module.exports = router;

