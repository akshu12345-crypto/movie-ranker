const { mongoose } = require("../config/dbConnection.js");

var Schema = mongoose.Schema;
var users = new Schema(
  {
    email: String,
    password: String,
  },
  {
    collection: "users",
  }
);

var users = mongoose.model("users", users);
module.exports.users = users;
