const { mongoose } = require("../config/dbConnection.js");

var Schema = mongoose.Schema;
var movies = new Schema(
  {
    movie_name: String,
    movie_poster: String,
    movie_details: String,
    movie_rating: String,
  },
  {
    collection: "movies",
  }
);

var movies = mongoose.model("movies", movies);
module.exports.movies = movies;
