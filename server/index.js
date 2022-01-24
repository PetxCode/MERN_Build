const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = "mongodb://localhost/eShop";
const path = require("path");

const port = 5599;

const app = express();

mongoose.connect(url).then(() => {
  console.log("the eStore database is now connected");
});

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./route/router"));

app.listen(port, () => {
  console.log(`this shop server is now open...!`);
});
