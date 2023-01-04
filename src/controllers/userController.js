const { users } = require("../models/userModel.js");
const { movies } = require("../models/moviesModel.js");
const { userReview } = require("../models/userReviewModel.js");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

async function addReviev(req, res) {
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
  await updateRating(req.body.movie_id, req.body.user_rating);
  /* INSERT REVIEW */
  userReview
    .create({
      user_name: req.body.user_name,
      user_detail_review: req.body.user_detail_review,
      movie_id: req.body.movie_id,
      user_rating: req.body.user_rating,
    })
    .then((movies) =>
      res.status(200).json({
        success: true,
        message: "I grateful for your feedback.",
        data: {},
      })
    );
}
// function updateRating(movie_id, user_rating) {

function updateRating(movie_id, user_rating) {
  console.log(movie_id, user_rating);
  userReview.find(
    { movie_id: movie_id },
    "user_rating",
    function (err, record) {
      Array.prototype.sum = function (prop) {
        var total = 0;
        for (var i = 0, _len = this.length; i < _len; i++) {
          total += parseInt(this[i][prop]);
        }
        return total;
      };
      console.log(
        "usser rating sum:" +
          record.sum("user_rating") +
          " user_rating:" +
          parseInt(user_rating) +
          " record_length:" +
          record.length
      );
      var updatedReview =
        (record.sum("user_rating") + parseInt(user_rating)) /
        (record.length + 1);
      if (Math.sign(updatedReview) !== 1) {
        updatedReview = 0;
      }
      console.log(updatedReview);
      movies.findByIdAndUpdate(
        movie_id,
        { movie_rating: updatedReview },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log(docs);
          }
        }
      );
    }
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
module.exports = { addReviev, movieListing, updateRating };
