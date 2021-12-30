// Connection client
const {
  Pool
} = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err, client) => {
  console.error("Error:", err);
});

module.exports = pool;