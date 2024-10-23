const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'reactsns'
});

connection.connect((err) => {
    if(err){
        console.log('MySQL Error:', err );
        return;
    }
    console.log('Running MySQL')
})

module.exports = connection;