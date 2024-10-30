const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 200, // 동시 사용 가능한 커넥션
})
const getConnection = async () => {
    try{
        const connection = await pool.getConnection();
        console.log('Running MySQL');
        return connection;
    } catch(err){
        console.log('MySQL Error:', err );
        return null;
    }
} 

module.exports = getConnection;