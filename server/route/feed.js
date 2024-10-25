const express = require('express');
const router = express.Router();
const getConnection = require('../db');
const authJWT = require('../middleware/authJWT');

const connection = getConnection();

router.route('/')
    .get(authJWT, (req, res) => {
        res.json({success: true, message: 'new Feed'})

    })

module.exports = router;