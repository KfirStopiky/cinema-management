const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/subscriptions", () => {
  console.log("mongo is connected");
});
