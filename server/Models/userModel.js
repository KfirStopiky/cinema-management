const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: String,
    sessionTimeOut: { type: Number, default: 10 },
    permissions: [String],
    userName: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", usersSchema);
