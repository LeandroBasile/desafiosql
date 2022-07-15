const knex = require('knex')

const conf = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "coder",
  },
  pool: { min: 0, max: 7 },
}




const dbconnection = knex(conf)

module.exports = dbconnection