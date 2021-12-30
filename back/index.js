require("dotenv").config({ path: "./.env" });
const express = require("express");
// const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

// access to json
app.use(express.json());
// access to req.body
app.use(
  express.urlencoded({
    extended: false,
  })
);

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// });

// router import
app.use("/v1", require("./app/router"));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});