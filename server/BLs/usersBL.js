const membersDAL = require("../DALs/membersDAL");
const usersSchema = require("../Models/userModel");

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allUsers = await usersSchema.find();
      resolve({ error: false, allUsers });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getAllUsers };
