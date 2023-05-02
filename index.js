/** @format */

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const chefs = require("./data/chefs.json");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running on port 5000");
});

//all data
app.get("/chefs", (req, res) => {
  res.send({ status: true, data: chefs });
});

// filtered by origin
app.get("/origins/:origin", (req, res) => {
  const origin = req.params.origin;
  const originData =
    chefs.filter((ch) =>
      ch.origin.toLowerCase().includes(`${origin.toLowerCase()}`)
    ) || [];
  res.send(originData);
});

//single data by id
app.get("/chefs/:id", (req, res) => {
  const id = req.params.id;
  const singleData = chefs.find((ch) => ch._id == id) || {};
  res.send(singleData);
});

app.get("/chefs/filter/:num", (req, res) => {
  const num = parseInt(req.params.num);
  if (num !== String && num < 100) {
    const filteredData = chefs.slice(0, num);
    res.send(filteredData);
  }
  res.send([]);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
