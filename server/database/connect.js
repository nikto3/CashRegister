const sql = require('mssql');
const {config} = require('./config');

async function connectToDB(){
    try {
        const pool = await sql.connect(config);
        return pool;
    }
    catch(err){
        throw err;
    }
}

module.exports = {connectToDB};