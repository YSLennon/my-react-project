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
        let query = `SELECT feedNo, f.id, text, name, DATE_FORMAT(createdAt, '%m월%d일') AS createdAt FROM tbl_feed f inner join tbl_user u on f.id = u.id order by feedNo desc`;
        const [feedList] = await connection.query(query);
        query = `SELECT boardNo, c.id, content, DATE_FORMAT(c.createdAt, '%m월%d일') AS createdAt, u.name from tbl_comment c INNER JOIN tbl_feed f on c.boardno = f.feedNo inner join tbl_user u on c.id = u.id order BY c.commentNo`;
        const [commentList] = await connection.query(query);
        query = 'select * from tbl_file order by fileNo desc';
        const [fileList] = await connection.query(query);

        // console.log(fileList);

        // fs.readdir(FEED_PATH, (err, files) => {
        //     if (err) return res.status(500).send(err);
        //     console.log(files);
        //     const imageFiles = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file}`);
        //     res.json(imageFiles);
        // });
        // console.log(fileList)
        // let images = null;
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
                acc[item.boardNo].push([item.id, item.content, item.name, item.createdAt]);
                return acc;
            }, {});
        }
        
        res.json({success: true, message: 'new Feed', images, feedList, comments})

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
        } 
    })

router.route('/:uid')
    .get(authJWT, async (req, res) => {
        const connection = await getConnection();
        let query = `SELECT feedNo, id, text, DATE_FORMAT(createdAt, '%m월%d일') AS createdAt from tbl_feed where id = ? order by feedNo desc`;
        const [feedList]= await connection.query(query, req.params.uid);
        query = `SELECT boardNo, c.id, content, DATE_FORMAT(c.createdAt, '%m월%d일') AS createdAt, u.name from tbl_comment c INNER JOIN tbl_feed f on c.boardno = f.feedNo  join tbl_user u on c.id = u.id WHERE f.id= ? order BY c.commentNo`;
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
                acc[item.boardNo].push([item.id, item.content, item.name, item.createdAt]);
                return acc;
            }, {});
        }
        
        res.json({success: true, message: 'new Feed', images, feedList, comments})
    })
    .post(authJWT, async (req, res) => { // comment
        let query = 'insert into tbl_comment (boardNo, id, content) values (?, ?, ?)'
        const connection = await getConnection();
        try{    
            const [feedResult] = await connection.query(query, [req.body.boardNo ,req.params.uid, req.body.content]);
            query = `SELECT boardNo, c.id, content, DATE_FORMAT(c.createdAt, '%m월%d일') AS createdAt, u.name from tbl_comment c INNER JOIN tbl_feed f on c.boardno = f.feedNo  join tbl_user u on c.id = u.id WHERE f.feedno = ? order BY c.commentNo`
            const [commentList] = await connection.query(query, [req.body.boardNo]);
            
            let comments;
            if(commentList.length !== 0){
                comments = commentList.reduce((acc, item) => {
                    if(!acc[item.boardNo]){
                        acc[item.boardNo] = []
                    };
                    acc[item.boardNo].push([item.id, item.content, item.name, item.createdAt]);
                    return acc;
                }, {});
            }
            res.json({ success: true, message: '작성되었습니다.', comments});


        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({ success: false, message: '댓글 작성에 실패했습니다.'});
        } 
    })

module.exports = router;

