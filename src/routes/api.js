//routes

const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController.js");
const user = require("../controllers/userController.js");

const { check } = require("express-validator");

/* GET programming languages. */
router.post(
  "/api/add-movies",
  check("movie_name").isLength({ min: 3, max: 50 }).withMessage({
    message: "required minimum: 3 characters; maximum: 50 characters",
    errorCode: 1,
  }),
  check("movie_details").isLength({ min: 3, max: 500 }).withMessage({
    message: "required minimum: 3 characters; maximum: 500 characters",
    errorCode: 1,
  }),
  admin.addMovies
);

router.get("/api/movieListing", admin.movieListing);

router.post(
  "/api/add-review",
  check("movie_id").notEmpty().withMessage({
    message: "Movie not selected",
    errorCode: 1,
  }),
  check("user_name").isLength({ min: 3, max: 50 }).withMessage({
    message: "required minimum: 3 characters; maximum: 50 characters",
    errorCode: 1,
  }),
  check("user_detail_review").isLength({ min: 3, max: 500 }).withMessage({
    message: "required minimum: 3 characters; maximum: 500 characters",
    errorCode: 1,
  }),
  check("user_rating").notEmpty().withMessage({
    message: "A minimum 1 star is necessary",
    errorCode: 1,
  }),
  user.addReviev
);

router.post(
  "/api/login",
  check("email").notEmpty().withMessage({
    message: "Email ID equired",
    errorCode: 1,
  }),
  check("password").notEmpty().withMessage({
    message: "Password required",
    errorCode: 1,
  }),
  admin.login
);

router.post("/updateRating", user.updateRating);

module.exports = router;
// app.post("/Login", );
// app.post("/AddMovie", (req, res) => {
//   console.log(req.body);
//   const { name, email, password } = req.body;
//   users.findOne({ email: email }, (err, user) => {
//     if (user) {
//       res.send({ message: "user already exist" });
//     } else {
//       const user = new users({ name, email, password });
//       user.save((err) => {
//         if (err) {
//           res.send(err);
//         } else {
//           res.send({ message: "sucessfull" });
//         }
//       });
//     }
//   });
// });
