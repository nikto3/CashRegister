const {connectToDB} = require("../database/connect");
const sql = require("mssql");
const moment = require('moment');


async function addProductQuery(product){
    try {
        const pool = await connectToDB();

        const res = await pool
            .request()
            .input('Naziv', sql.VarChar(50), product.name)
            .input('Cijena', sql.Decimal(5, 2), product.price)
            .input('Naziv_Vrste', sql.VarChar(50), product.type)
            .query
            `
                INSERT INTO Proizvod ("Cijena", "Naziv_Vrste", "Naziv")
                OUTPUT INSERTED.*
                VALUES (@Cijena, @Naziv_Vrste, @Naziv)
            `
        return res.recordset[0];
    }
    catch (e) {
        throw e;
    }
}

async function updateProductQuery(product){
    try {
        const pool = await connectToDB();

        const res = await pool
            .request()
            .input('Naziv', sql.VarChar(50), product.name)
            .input('Cijena', sql.Decimal(5, 2), product.price)
            .input('Naziv_Vrste', sql.VarChar(50), product.type)
            .input('ID', sql.Int, product.ID)
            .query
            `
                UPDATE Proizvod
                SET Naziv=@Naziv,
                    Cijena=@Cijena,
                    Naziv_Vrste=@Naziv_Vrste
                WHERE ID=@ID
            `

        return res.rowsAffected[0] === 1;
    }
    catch(e){
        throw e;
    }
}

async function deleteProductQuery(ID) {
    try {
        const pool = await connectToDB();

        const res = await pool
            .request()
            .input('ID', sql.Int, ID)
            .query('DELETE FROM Proizvod WHERE ID = @ID');

        return res.rowsAffected[0] === 1;
    } catch (e) {
        throw e;
    }
}

async function getProductsTodayQuery(){
    try {
        const pool = await connectToDB();
        const date = moment().format('YYYY-MM-DD');

        const res = await pool
            .request()
            .input('date', sql.Date, date)
            .query
            `
                SELECT P.Naziv, P.Cijena, V.Naziv_Kat, COUNT(*) AS Kolicina
                FROM Racun_proizvod RP JOIN Izvjestaj I on I.ID = RP.Izvjestaj_ID
                JOIN Proizvod P on RP.P_ID = P.ID JOIN Vrsta V on P.Naziv_Vrste = V.Naziv
                JOIN Kategorija K on V.Naziv_Kat = K.Naziv
                WHERE I.Datum=@date
                GROUP BY P.ID, P.Naziv, P.Cijena, V.Naziv_Kat
            `

        return res.recordset;
    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    deleteProductQuery,
    addProductQuery,
    updateProductQuery,
    getProductsTodayQuery
}