const sql = require('mssql');
const {connectToDB} = require('../../database/connect');

async function getMainCoursesQuery(){
    const pool = await connectToDB();

    const res = await pool
        .request()
        .query
        `   SELECT p.ID, v.Naziv, p.Cijena
            FROM Proizvod p JOIN Kategorija k ON p.Naziv_Kat=k.Naziv
            JOIN Vrsta v ON k.Naziv=v.Naziv_Kat
            WHERE k.Naziv='Hrana' AND v.Tip='Glavno jelo'
        `;

    return res ? res.recordset : null;
}


module.exports = { getMainCoursesQuery }