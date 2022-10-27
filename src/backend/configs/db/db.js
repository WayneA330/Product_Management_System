const db = {
  client: "mssql",
  connection: {
    server: "localhost",
    user: "sa",
    password: "Celestin2003.",
    port: 1433,
  },
  pool: {
    min: 0,
    max: 100,
    idleTimeoutMillis: 30000,
  },
  options: {
    enableArithAbort: true,
  },
};

module.exports = db;
