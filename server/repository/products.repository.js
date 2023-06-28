const {connectToDB} = require("../database/connect");
const sql = require("mssql");


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

module.exports = {
    deleteProductQuery,
    addProductQuery,
    updateProductQuery
}