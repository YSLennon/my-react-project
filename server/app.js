const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3100);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중, multer, bcrypt, jsonwebtoken 다시 받았으니까 확인해보기');
});
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
