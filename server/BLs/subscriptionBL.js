const subscriptionSchema = require("../Models/subscriptionsModel");

const addSubscription = (MemberId, Movies) => {
  console.log(MemberId);
  return new Promise(async (resolve, reject) => {
    try {
      let newSubscription = await new subscriptionSchema({
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
