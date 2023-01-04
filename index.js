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

// mongoose.connect("mongodb://127.0.0.1:27017/movie-ranker", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// () => {
//   console.log("connected to DB");
// };

//user schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });
// const users = new mongoose.model("users", userSchema);
app.get("/", (req, res) => {
  console.log("Person");
  res.end();
});
const PORT = process.env.PORT || 3030;

// your code

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
// app.listen(6969, () => {
//   //   console.log("started");
// });
