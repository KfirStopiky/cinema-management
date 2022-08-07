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

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await usersSchema.findById(id);
      resolve({ error: false, user });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const editUser = (_id, firstName, lastName, sessionTimeOut, userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await usersSchema.findByIdAndUpdate(
        _id,
        {
          $set: {
            firstName,
            lastName,
            userName,
            sessionTimeOut,
          },
        },
        { new: true }
      );
      resolve({
        error: false,
        message: "User has been edited successfully!",
        user,
      });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await usersSchema.findByIdAndDelete(id);
      resolve({ error: false, message: "User has been deleted successfully" });
    } catch (error) {
      reject(error);
    }
  });
};

const addUser = (obj) => {
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
        name,
        userName,
        password: hashedPassword,
      }).save();
      return resolve({ error: false, newUser });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getAllUsers, deleteUser, getUser, editUser };
