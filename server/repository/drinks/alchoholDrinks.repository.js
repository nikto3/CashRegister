const { connectToDB } = require('../../database/connect');
const sql = require('mssql');

async function getAlcoholDrinksQuery(){
    try {
        const pool = await connectToDB();

        const res = await pool
            .request()
            .query
            `   SELECT ID, P.Naziv, Cijena, Naziv_Vrste, Naziv_Kat
            FROM Proizvod P JOIN Vrsta V on P.Naziv_Vrste = V.Naziv
            WHERE P.Naziv_Vrste='Alkoholno pice'
        `;

        return res ? res.recordset : null;
    }

    catch (e) {
        console.log(e);
        return null;
    }
}

async function addAlcoholDrinkQuery(drink){
    try {
        const pool = await connectToDB();

        const res = await pool
            .request()
            .query
            `
                INSERT INTO Proizvod ("Cijena", "Naziv_Vrste", "Naziv")
                OUTPUT INSERTED.*
                VALUES (${drink.price}, 'Alkoholno pice', ${drink.name})
            `


        return res.recordset[0];
    }
    catch (e) {
        throw e;
    }
}

// todo zamijeniti ime argumenta u query-ima za hranu u food




module.exports = {
    getAlcoholDrinksQuery,
    addAlcoholDrinkQuery
}