
const express = require("express");
const cyc_db = require("./methods/Methods");

const app = express();
const records = new cyc_db();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/week", async (req, res) => {
  await records.week()
  .then(row => {
    res.send(row);
  })
})

app.listen(port, () => {
  console.log(`server started on port ${port}.`);
})