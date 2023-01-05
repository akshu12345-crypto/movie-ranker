const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./src/routes/api.js");
const fileUpload = require("express-fileupload");

const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "src/media/posters")));

app.use("/", routes);
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
