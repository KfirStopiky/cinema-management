const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  Name: String,
  Genres: [{ type: String }],
  Image: String,
  Premiered: String,
  Subscriptions_watched: [
    {
      memberID: String,
      memberName: String,
      date: Date,
    },
  ],
});

module.exports = mongoose.model("movies", movieSchema);
