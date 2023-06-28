const sql = require('mssql');
const { connectToDB } = require('../database/connect');
const moment = require('moment');

async function reportIsPrintedQuery(){
    try{
        const pool = await connectToDB();

        const res = await pool
            .request()
            .query
            `
                SELECT *
                FROM Izvjestaj
                WHERE Datum = CONVERT(date, GETDATE())
            `

        return res.recordset[0];
    }
    catch (e) {
        throw e;
    }
}

async function addReportQuery(waiterID){
    try {
        const pool = await connectToDB();
        const date = moment().format('YYYY-MM-DD');

        const res = await pool
            .request()
            .input('Korisnik_ID', sql.Int, waiterID)
            .input('Datum', sql.Date, date)
            .query
            `
                INSERT INTO Izvjestaj
                OUTPUT INSERTED.ID
                VALUES (@Datum, @Korisnik_ID)
            `;

        return res.recordset[0].ID
    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    reportIsPrintedQuery,
    addReportQuery
}