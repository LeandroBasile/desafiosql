const knex = require("knex");

const path = require("path");

const configSQLite3 = {
  client: "sqlite3",
  // connection: { filename: "./db/mydb.sqlite" },
  connection: { filename: path.join(__dirname, "./mydb.sqlite") },
  useNullAsDefault: true
}

const dbsqlite = knex(configSQLite3);

module.exports = dbsqlite;
