const sql = require("mssql");
const { connectToDB } = require("../database/connect");

async function getuserByUsernameQuery(username) {
  try {
    const pool = await connectToDB();

    const result = await pool.request().input("username", sql.VarChar(30), username)
      .query`SELECT * FROM Konobar WHERE Username=@username`;

    return result ? result.recordset[0] : null;
  } catch (err) {
    throw err;
  }
}

module.exports = { getuserByUsernameQuery };
