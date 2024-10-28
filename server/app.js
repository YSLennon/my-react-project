require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const getConnection = require('./db');
const getRedisClient = require("./utils/redis");
const basePath = './route/'
const cookieParser = require('cookie-parser');
const { FEED_PATH } = require("./constants/path");
const app = express();
const startServer = async () => {
    app.set('port', process.env.PORT || 3100);
    app.locals.redisClient = await getRedisClient();
    
    app.use(express.json());
    app.use(express.json({ type: 'application/json; charset=utf-8' }));
    app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded; charset=utf-8' }));
    // app.use(express.urlencoded({ extended: true})); // bodyParser랑 엮여있던듯?
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(cors({
        origin: 'http://localhost:3000', // 클라이언트 도메인
        credentials: true, // 쿠키를 허용
    }));
    

    app.use('/user', require(basePath+'user'));
    app.use('/feed', require(basePath+'feed'));
    app.use('/refresh', require(basePath+'refresh'));
    app.use('/test', require(basePath+'test'));
    
    app.use('/uploads', express.static('./storage/feed/'));

    // 배포 시 빌드파일 읽을 때 쓴다고 했던듯? 코딩애플 react-express 참고!
    // app.use(express.static(path.join(__dirname, '../client/build')));
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../client/build/index.html'));
    // });
    
    
    app.listen(app.get('port'), () => {
        console.log(app.get('port'), '번 포트에서 대기 중, multer, bcrypt, jsonwebtoken 다시 받았으니까 확인해보기');
    }); 
}
startServer();