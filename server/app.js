const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const basePath = './route/'

app.set('port', process.env.PORT || 3100);
app.use(express.json());
app.use(express.urlencoded({ extended: true})); // bodyParser랑 엮여있던듯?
app.use(cors({ origin : 'http://localhost:3000' }));
app.use(bodyParser.json());

app.use('/user', require(basePath+'user'));
// app.use('/user', require(basePath+'feed'));


// 배포 시 빌드파일 읽을 때 쓴다고 했던듯? 코딩애플 react-express 참고!
// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중, multer, bcrypt, jsonwebtoken 다시 받았으니까 확인해보기');
});
