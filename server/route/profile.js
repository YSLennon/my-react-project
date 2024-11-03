const express = require('express');
const router = express.Router();
const multer = require('multer');
const getConnection = require('../db');
const authJWT = require('../middleware/authJWT');
const { FEED_PATH, PROFILE_PATH } = require('../constants/path');
const { CAT_FEED, CAT_PROFILE } = require('../constants/category');
const path = require('path')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Multer 설정: 저장할 경로 및 파일 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PROFILE_PATH); // 저장할 폴더
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`
        cb(null, uniqueSuffix+ path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.route('/:uid')
    .post(authJWT, upload.single('uploaded_files'), async (req, res) => {
        const connection = await getConnection();
        try{
            let query = 'delete from tbl_file where profileId = ?'
            await connection.query(query, [req.params.uid]);
            query = 'insert into tbl_file (boardNo, orgName, filetype, filename, path, category, profileId) values (?, ?, ?, ?, ?, ?, ?)'
            const values = [ 0, decodeURIComponent( req.file.originalname), req.file.mimetype, req.file.filename, req.file.path, CAT_PROFILE, req.params.uid ];
            console.log('values : ', values);
            await connection.query(query, values);
            res.json({ success: true, message: '변경되었습니다.'});

        } catch (err){
            console.error(err); // 추가: 에러 로그 출력
            res.json({success: false, message: '서버 오류가 발생했습니다.'});
        } finally {
            connection.release(); // 반드시 커넥션 반환
        }
    })
        .get(authJWT, async (req, res) => {
            const connection = await getConnection();

            try{
                let query = `SELECT * FROM tbl_file WHERE profileId = ?`;
                const [[profileImage]] = await connection.query(query, [req.params.uid]);
                query = `SELECT * FROM tbl_user WHERE id = ?`;
                const [[user]] = await connection.query(query, [req.params.uid]);

                console.log(user);
                const profile = profileImage?`${req.protocol}://${req.get('host')}/uploadsProfile/${profileImage.filename}`:null;
                res.json({success: true, message: 'new profile', profile, profileId:user.id, profileName: user.name});

            } catch(e){
                console.log(e);
            } finally {
                connection.release(); // 반드시 커넥션 반환
            }

        })
module.exports = router;

