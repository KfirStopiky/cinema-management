const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env;

const login = (req, userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userSchema
        .findOne({
          userName,
          password,
        })
        .lean();
      if (!user) return resolve("Invalid username/password");
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { id: user._id, username: user.Username },
          JWT_SECRET,
          { expiresIn: 300 }
        );
        req.session.user = { user_id: user._id };
        return resolve({ auth: true, token, user });
      }
    } catch (error) {
      return reject("Error");
    }
  });
};

module.exports = { login };
