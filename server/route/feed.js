const express = require('express');
const router = express.Router();
const multer = require('multer');
const getConnection = require('../db');
const authJWT = require('../middleware/authJWT');
const { FEED_PATH } = require('../constants/path');
const { CAT_FEED } = require('../constants/category');

const upload = multer({ dest: FEED_PATH })



router.route('/')
    .get(authJWT, (req, res) => {
        res.json({success: true, message: 'new Feed'})

    })
router.route('/:id')
    .post(authJWT, upload.array('uploaded_files', 5), async (req, res) => {
        let query = 'insert into tbl_feed (id, text) values (?, ?)'
        const connection = await getConnection();

        const rsHeader = await connection.query(query, [req.params.id, req.body.text], (err, results)=>{
            if(err){
                res.json({success: false, message: '게시글 작성에 실패하였습니다.'});
                return null;
            } else{
                return results.insertId;
            }
        });
        const boardNo = rsHeader[0].insertId;
        if(boardNo){
            query = 'insert into tbl_file (boardNo, orgName, filetype, filename, path, category) values (?)'
            const values = req.files.map(item => [boardNo, decodeURIComponent(item.originalname), item.mimetype, item.filename, item.path, CAT_FEED]);

            console.log(query + values);
            await connection.query(query, values, (err, results) => {
                if(err){
                    res.json({success: false, message: '파일 첨부에 실패했습니다.'});
                    return ;
                } else{
                    res.json({success: true, message: '작성되었습니다.'});
                }
            })
        }        
    })

module.exports = router;