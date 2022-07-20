const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  Name: String,
  Genres: [{ type: String }],
  Image: String,
  Premiered: String,
});

module.exports = mongoose.model("movies", movieSchema);
