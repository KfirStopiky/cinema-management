const bcrypt = require("bcrypt");
const userSchema = require("../Models/userModel");

const registerUser = async (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userSchema.find({ Username: username });
      if (user.length == 0) return resolve("User not found");
      let id = user[0]._id;
      const newUser = userSchema.findByIdAndUpdate(id, {
        Username: username,
        Password: hashedPassword,
      });
      return resolve(newUser);
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = { registerUser };
