const {connectToDB} = require('../../database/connect');

async function getAppetizersQuery(){
    const pool = await connectToDB();

    const res = await pool
        .request()
        .query
        `   SELECT ID, P.Naziv, Cijena, Naziv_Vrste, Naziv_Kat
            FROM Proizvod P JOIN Vrsta V on P.Naziv_Vrste = V.Naziv
            WHERE P.Naziv_Vrste='Predjelo'
        `;

    return res ? res.recordset : null;
}


module.exports = { getAppetizersQuery }