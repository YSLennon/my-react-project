const mysql = require('mysql2/promise');

const getConnection = async () => {
    try{
        const result = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        console.log('Running MySQL');
        return result;
    } catch(err){
        console.log('MySQL Error:', err );
        return;
    }
} 

// connection.connect((err) => {
//     if(err){
        
//     }
    
// })

module.exports = getConnection;