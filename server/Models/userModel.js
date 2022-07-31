const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: String,
    sessionTimeOut: { type: Number, default: 10 },
    permissions: {
      type: [],
      default: [],
      // View_Subscriptions: true,
      // Create_Subscriptions: true,
      // Delete_Subscriptions: true,
      // View_Movies: true,
      // Create_Movies: true,
      // Delete_Movies: true,
    },
    userName: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", usersSchema);
