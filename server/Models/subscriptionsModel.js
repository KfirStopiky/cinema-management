const mongoose = require("mongoose");

const subscriptionsSchema = new mongoose.Schema({
  MemberId: String,
  // Movies: String
  // Movies: [
  //   {
  //     movieId: String,
  //     date: Date,
  //   },
  // ],
});

module.exports = mongoose.model("subscriptions", subscriptionsSchema);
