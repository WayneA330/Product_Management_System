const dbConfig = require("../configs/db/db");
const knex = require("knex");
const knexDb = knex(dbConfig);

module.exports = {
  knexDb,
};
