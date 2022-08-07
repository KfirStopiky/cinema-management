const membersDAL = require("../DALs/membersDAL");
const memberSchema = require("../Models/memberModel");

const loadMembersToDB = () => {
  return new Promise(async (resolve, reject) => {
    // Get all members from WS
    let membersFullData = await membersDAL.getMembers();
    let members = membersFullData.data;

    let memberObj = {
      
    };
    // Insert members to DB
    members.forEach((m) => {
      memberObj = memberSchema({
        Name: m.name,
        Email: m.email,
        City: m.city,
      });
      memberObj.save((err) => {
        if (err) reject(err);
        resolve(members);
      });
    });
  });
};

module.exports = { loadMembersToDB };
