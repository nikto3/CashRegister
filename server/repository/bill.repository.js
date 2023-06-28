const sql = require('mssql');
const { connectToDB } = require('../database/connect');
const moment = require('moment');

async function addBillQuery(waiterID){
    try {
        const dateAndTime = new Date();

        const pool = await connectToDB();

        const res = await pool
            .request()
            .input('Datum_i_vrijeme', sql.DateTime2, dateAndTime)
            .input('KonobarID', sql.Int, waiterID)
            .query
            `
                INSERT INTO Racun 
                OUTPUT INSERTED.ID
                VALUES (@Datum_i_vrijeme, @KonobarID)
            `;
        return res.recordset[0].ID;
    }
    catch (e) {
        throw e;
    }
}

async function getBillsQuery(){
    try {
        const currentDate = moment().format('YYYY-MM-DD');

        const pool = await connectToDB();

        const res = await pool
            .request()
            .input('Datum', sql.Date, currentDate)
            .query
            `
                SELECT ID
                FROM Racun
                WHERE CONVERT(DATE, Datum_i_vrijeme) = @Datum
            `;

        return res.recordset.map((row) => row.ID);
    }
    catch (e) {
        throw e;
    }
}

async function updateBillProductQuery(reportID, billID){
    try {
        const pool = await connectToDB();

        const res = await pool
            .request()
            .input('R_ID', sql.Int, billID)
            .query
            `
                UPDATE Racun_proizvod
                SET Izvjestaj_ID=${reportID}
                WHERE R_ID=@R_ID
            `

        return res.rowsAffected[0] >= 1;
    }
    catch (e) {
        throw e;
    }
}

async function addBillProductQuery(billID, product){
    try {
        const { id, quantity } = product;

        const pool = await connectToDB();

        const res = await pool
            .request()
            .input('R_ID', sql.Int, billID)
            .input('P_ID', sql.Int, id)
            .input('Kolicina', sql.Int, quantity)
            .query
            `
                INSERT INTO Racun_proizvod (R_ID, P_ID, Kolicina)
                VALUES (@R_ID, @P_ID, @Kolicina)
            `;

        return res.rowsAffected[0] === 1;

    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    addBillQuery,
    addBillProductQuery,
    getBillsQuery,
    updateBillProductQuery
}