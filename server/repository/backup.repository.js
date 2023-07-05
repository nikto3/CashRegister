const sql = require('mssql');
const { connectToDB } = require('../database/connect');
const moment = require('moment');

async function insertPreviousProductInfoQuery(productID){
    try {
        const pool = await connectToDB();
        const today = moment().format('YYYY-MM-DD');
        const res = await pool
            .request()
            .input('Datum_izmjene', sql.Date, today)
            .input('productID', sql.Int, productID)
            .query
            `
                INSERT INTO BackupProizvod (Proizvod_ID, Cijena, Naziv_Vrste, Naziv, Datum_izmjene) 
                SELECT ID, Cijena, Naziv_Vrste, Naziv, @Datum_izmjene
                FROM Proizvod
                WHERE ID=@productID
            `;

        return res.rowsAffected[0] === 1;
    }
    catch (e) {
        throw e;
    }
}

async function getProductPreviousInfoQuery(productID){
    try {
        const pool = await connectToDB();

        const res = await pool
            .request()
            .input('Proizvod_ID', sql.Int, productID)
            .query
            `
                SELECT *
                FROM BackupProizvod
                WHERE Proizvod_ID=@Proizvod_ID
            `;

        return res.recordset;
    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    insertPreviousProductInfoQuery,
    getProductPreviousInfoQuery
}