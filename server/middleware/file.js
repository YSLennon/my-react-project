const path = require('path');
const multer  = require('multer')

const { FEED_PATH } = require('../constants/path');


const fileUpload = (req, res, next) => {
    console.log(FEED_PATH)
    console.log(req);
    
}

module.exports = fileUpload;