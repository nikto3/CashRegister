const sql = require("mssql");
const { connectToDB } = require("../database/connect");

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

module.exports = { getUserByUsernameQuery, getUsersQuery };
