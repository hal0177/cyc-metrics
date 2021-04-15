
const express = require("express");
const Timespan = require("./Timespan");

const app = express();
const timespan = new Timespan();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/day", async (req, res) => {
  const day = await timespan.day();
  res.json(day);
})

app.get("/week", async (req, res) => {
  const week = await timespan.week();
  res.json(week);
});

app.listen(port, () => {
  console.log(`server started on port ${port}.`);
});