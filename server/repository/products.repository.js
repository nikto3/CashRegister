const {connectToDB} = require("../database/connect");
const sql = require("mssql");


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
    deleteProductQuery
}