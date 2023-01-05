const { users } = require("../models/userModel.js");
const { movies } = require("../models/moviesModel.js");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

function login(req, res) {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors
        .array()
        .map((e) => {
          return " " + e.msg.message;
        })
        .toString(),
      data: {},
    });
  }

  const { email, password } = req.body;
  users.findOne({ email: email }, function (err, person) {
    console.log(person);
    if (person) {
      if (password === person.password) {
        return res.status(200).json({
          success: true,
          message: "loged in successfully",
          data: person,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Wong Credentials",
          data: {},
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Not Registered",
        data: {},
      });
    }
  });
}

function addMovies(req, res) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors
        .array()
        .map((e) => {
          return e.param + " " + e.msg.message + "\n";
        })
        .toString(),
      data: {},
    });
  }
  if (req.files) {
    if (!req.files.movie_poster) {
      return res.status(400).json({
        success: false,
        message: "movie_poster file required",
        data: {},
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "movie_poster file required",
      data: {},
    });
  }
  /* File validation for PNG and JPG */
  if (
    req.files.movie_poster.name.split(".").pop() !== "png" &&
    req.files.movie_poster.name.split(".").pop() !== "jpg"
  ) {
    return res.status(400).json({
      success: false,
      message: "movie_poster file must be in png or jpg format",
      data: {},
    });
  }
  /* SAVE FILE */
  let fileName =
    Math.floor(Math.random() * 10000) +
    "." +
    req.files.movie_poster.name.split(".").pop();
  fs.writeFile(
    path.join(__dirname, "../media/posters/") + fileName,
    req.files.movie_poster.data,
    function (err) {
      if (err) throw err;
    }
  );
  /* INSERT MOVIE */
  movies
    .create({
      movie_name: req.body.movie_name,
      movie_poster: fileName,
      movie_details: req.body.movie_details,
      movie_rating: 0,
    })
    .then((movies) =>
      res.json({
        success: true,
        message: "Movie added Successfully",
        data: {},
      })
    );
}

function movieListing(req, res) {
  movies.find({}, function (err, movies) {
    if (movies) {
      res.json({
        success: true,
        message: "All movies loaded Successfully",
        data: movies,
      });
    } else {
      res.json({
        success: false,
        message: "fail to load movies",
        data: {},
      });
    }
  });
}
module.exports = {
  login,
  addMovies,
  movieListing,
};
