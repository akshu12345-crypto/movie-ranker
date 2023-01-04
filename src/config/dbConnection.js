const mongoose = require("mongoose");

let con = mongoose.connect(
  `mongodb+srv://pratap:mongodb1999@cluster0.lgac9qg.mongodb.net/movie-ranker?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
() => {
  console.log("connected to DB");
};

module.exports.mongoose = mongoose;
