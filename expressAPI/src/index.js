const express = require('express');
const app = express();
const cyc_db = require('./db_methods/DbMethods');
const records = new cyc_db();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/week', async (req, res) => {
  await records.week()
  .then(row => {
    res.send(row);
  })
})

app.listen(port, () => {
  console.log(`server started on port ${port}.`);
})