const {connectToDB} = require('../../database/connect');
const sql = require("mssql");

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
async function addAppetizerQuery(drink){
    try {
        const pool = await connectToDB();

        const res = await pool
            .request()
            .query
            `
                INSERT INTO Proizvod ("Cijena", "Naziv_Vrste", "Naziv")
                OUTPUT INSERTED.*
                VALUES (${drink.price}, 'Predjelo', ${drink.name})
            `


        return res.recordset[0];
    }
    catch (e) {
        throw e;
    }
}


module.exports = {
    getAppetizersQuery,
    addAppetizerQuery
}