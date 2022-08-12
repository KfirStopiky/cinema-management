const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const usersSchema = require("../Models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let SECRET = "fsdkfhwfhi2hr209239103i131jdjcsdccbd";
const JWT_SECRET = process.env.SECRET;

const registerUser = async (firstName, lastName, userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existUser = await usersSchema.find({ userName });
      if (existUser.length > 0) {
        return resolve({
          error: true,
          message: "This user name already exist, please choose another one",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser = await new usersSchema({
        firstName,
        lastName,
        userName,
        password: hashedPassword,
      }).save();
      return resolve({ error: false, newUser });
    } catch (error) {
      return reject(error);
    }
  });
};

const login = (req, userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await usersSchema
        .findOne({
          userName,
        })
        .lean();
      if (!user) {
        return resolve({ error: true, message: "User doen't exist" });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return resolve({
            error: true,
            message: "Invalid details",
          });
        } else {
          const access_token = jwt.sign({ user }, SECRET, {
            expiresIn: 300,
          });
          return resolve({ error: false, access_token });
        }
      }
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = { login, registerUser };
