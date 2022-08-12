const subscriptionSchema = require("../Models/subscriptionsModel");

const addSubscription = (MemberId) => {

  return new Promise(async (resolve, reject) => {
    try {
      let newSubscription = await new movieSchema({
        MemberId,
        Movies,
      }).save();
      return resolve({ error: false, newSubscription });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

module.exports = { addSubscription };
