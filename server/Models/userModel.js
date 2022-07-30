const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: String,
  sessionTimeOut: Number,
  permissions: [String],
  userName: String,
  password: String,
});

module.exports = mongoose.model("users", usersSchema);
