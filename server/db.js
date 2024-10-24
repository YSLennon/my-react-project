const mysql = require('mysql2/promise');

const getConnection = async () => {
    try{
        const result = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'test1234',
            database: 'reactsns'
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