const express = require('express');
const router = express.Router();
const multer = require('multer');
const getConnection = require('../db');
const authJWT = require('../middleware/authJWT');
const { FEED_PATH } = require('../constants/path');
const { CAT_FEED } = require('../constants/category');
const path = require('path')
const fs = require('fs');

// Multer 설정: 저장할 경로 및 파일 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FEED_PATH); // 저장할 폴더
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름에 타임스탬프 추가
    }
});
const upload = multer({ storage });

router.route('/')
    .get(authJWT, async (req, res) => {
        const connection = await getConnection();
        let query = 'select * from tbl_feed order by createdAt desc';
        const [feedList] = await connection.query(query);
        query = 'select * from tbl_file';
        const [fileList] = await connection.query(query);
        console.log('fileList:', fileList);

        // console.log(fileList);

        // fs.readdir(FEED_PATH, (err, files) => {
        //     if (err) return res.status(500).send(err);
        //     console.log(files);
        //     const imageFiles = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file}`);
        //     res.json(imageFiles);
        // });
        // console.log(fileList)
        // let images = null;
        // if(fileList.length !== 0){
            const images = fileList.reduce((acc, item) => {
                if(!acc[item.boardNo]){
                    acc[item.boardNo] = []
                };
                acc[item.boardNo].push([item.orgName, item.fileType, `${req.protocol}://${req.get('host')}/uploads/${item.filename}`, item.path, item.uploadedAt]);
                return acc;
            }, {});
         
        console.log(images);   
        // }
        
        res.json({success: true, message: 'new Feed', images, feedList})

    })
router.route('/:id')
    .post(authJWT, upload.array('uploaded_files', 5), async (req, res) => {
        let query = 'insert into tbl_feed (id, text) values (?, ?)'
        const connection = await getConnection();
        try{    
            const [feedResult] = await connection.query(query, [req.params.id, req.body.text]);
            
            const boardNo = feedResult.insertId;
            if(boardNo){
                query = 'insert into tbl_file (boardNo, orgName, filetype, filename, path, category) values ?'
                const values = req.files.map(item => [boardNo, decodeURIComponent(item.originalname), item.mimetype, item.filename, item.path, CAT_FEED]);
                console.log(values);
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

module.exports = router;

