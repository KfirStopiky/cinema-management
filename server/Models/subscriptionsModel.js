const mongoose = require("mongoose");

const subscriptionsSchema = new mongoose.Schema(
  {
    MemberId: String,
    Movie: [
      {
        movieID: String,
        movieName: String,
      },
    ],
    watching_date: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subscriptions", subscriptionsSchema);
