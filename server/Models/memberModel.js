const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  City: String,
  Watched_movies: [
    {
      movieID: String,
      movieName: String,
      watching_date: Date,
    },
  ],
});

module.exports = mongoose.model("members", memberSchema);
