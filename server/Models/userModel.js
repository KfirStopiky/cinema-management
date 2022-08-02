const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    sessionTimeOut: { type: Number, default: 10 },
    permissions: {
      type: {},
      default: {
        viewSubscriptions: true,
        createSubscriptions: true,
        updateSubscription: true,
        deleteSubscriptions: true,
        viewMovies: true,
        createMovies: true,
        updateMovie: true,
        deleteMovies: true,
      },
    },
    userName: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", usersSchema);
