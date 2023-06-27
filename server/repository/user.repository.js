const sql = require("mssql");
const { connectToDB } = require("../database/connect");
const bcrypt = require('bcryptjs');

async function getUserByUsernameQuery(username) {
  try {
    const pool = await connectToDB();

    const result = await pool.request().input("username", sql.VarChar(30), username)
      .query`SELECT * 
            FROM Korisnik 
            WHERE Username=@username`;

    return result ? result.recordset[0] : null;
  } catch (err) {
    throw err;
  }
}

async function getUsersQuery(){
  try {
    const pool = await connectToDB();

    const result = await pool
                        .request()
                        .query
        `
          SELECT *
          FROM Korisnik
        `

    return result ? result.recordset : null;
  }
  catch (e) {
      throw e;
  }
}
async function deleteWaiterQuery(ID){
  try {
    const pool = await connectToDB();

    const res = await pool
        .request()
        .input('ID', sql.Int, ID)
        .query
        `
          DELETE FROM Korisnik
          WHERE ID=@ID
        `

    return res.rowsAffected[0] === 1;
  }
  catch (e) {
    throw e;
  }
}

async function addWaiterQuery(waiter){
  try {

    const pool = await connectToDB();

    const { name, surname, username, password } = waiter;

    const hash = await bcrypt.hash(password, 10);

    const res = await pool
        .request()
        .input('ime', sql.VarChar(30), name)
        .input('prezime', sql.VarChar(30), surname)
        .input('username', sql.VarChar(30), username)
        .input('password', sql.VarChar(100), hash)
        .query
        `
          INSERT INTO Korisnik
            OUTPUT INSERTED.*
          VALUES (@ime, @prezime, @username, @password, 'Konobar')
        `;

    return res.recordset[0];

  }
  catch (e) {
    throw e;
  }
}

module.exports = {
  getUserByUsernameQuery,
  getUsersQuery,
  addWaiterQuery,
  deleteWaiterQuery
};
