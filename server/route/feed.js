const express = require('express');
const router = express.Router();
const multer = require('multer');
const getConnection = require('../db');
const authJWT = require('../middleware/authJWT');
const { FEED_PATH } = require('../constants/path');

const upload = multer({ dest: FEED_PATH })


const connection = getConnection();

router.route('/')
    .get(authJWT, (req, res) => {
        res.json({success: true, message: 'new Feed'})

    })
router.route('/:id')
    .post(authJWT, upload.array('uploaded_files', 5), (req, res) => {
        console.log(req.body.text);
        req.files.forEach(item => {
            console.log(item);
            console.log(decodeURIComponent(item.originalname));
            const a = {
                orgName: decodeURIComponent(item.originalname),
                filename: item.filename,
                path: item.path,
            }
        }) 

        if (req.fileValidationError) {
        }
        res.json({success: true, message: 'new Insert'})
    })

module.exports = router;