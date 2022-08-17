const membersDAL = require("../DALs/membersDAL");
const memberSchema = require("../Models/memberModel");

const loadMembersToDB = () => {
  return new Promise(async (resolve, reject) => {
    // Get all members from WS
    let membersFullData = await membersDAL.getMembers();
    let members = membersFullData.data;

    let memberObj = {};
    // Insert members to DB
    members.forEach((m) => {
      memberObj = memberSchema({
        Name: m.name,
        Email: m.email,
        City: m.address.city,
        Watched_movies: [],
      });
      memberObj.save((err) => {
        if (err) reject(err);
        resolve(members);
      });
    });
  });
};

const getAllMembers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allMembers = await memberSchema.find();
      resolve({ error: false, allMembers });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const getMember = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await memberSchema.findById(id);
      resolve({ error: false, member });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const addMember = (Name, Email, City) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newMember = await new memberSchema({
        Name,
        Email,
        City,
        // Watched_movies: [],
      }).save();
      return resolve({ error: false, newMember });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const deleteMember = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await memberSchema.findByIdAndDelete(id);
      resolve({
        error: false,
        message: "Member has been deleted successfully!",
      });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const editMember = (_id, Name, Email, City) => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await memberSchema.findByIdAndUpdate(
        _id,
        {
          $set: {
            Name,
            Email,
            City,
          },
        },
        { new: true }
      );
      resolve({
        error: false,
        message: "Member has been edited successfully!",
        member,
      });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

module.exports = {
  loadMembersToDB,
  getAllMembers,
  deleteMember,
  editMember,
  getMember,
  addMember,
};
