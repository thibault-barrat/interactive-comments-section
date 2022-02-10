// Connection client
const {
  Pool
} = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // on demande à accepter le fait de ne pas être en ssl
    rejectUnauthorized: false,
  },
});

pool.on("error", (err, client) => {
  console.error("Error:", err);
});

module.exports = pool;