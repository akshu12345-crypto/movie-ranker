const { mongoose } = require("../config/dbConnection.js");

var Schema = mongoose.Schema;
var userReview = new Schema(
  {
    user_name: String,
    user_detail_review: String,
    movie_id: String,
    user_rating: String,
  },
  {
    collection: "userReview",
  }
);

var userReview = mongoose.model("userReview", userReview);
module.exports.userReview = userReview;
