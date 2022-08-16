const subscriptionSchema = require("../Models/subscriptionsModel");
const memberSchema = require("../Models/memberModel");

const addSubscription = (MemberId, movieID, movieName, watching_date) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newSubscription = await new subscriptionSchema({
        MemberId,
        Movie: { movieID, movieName },
        watching_date,
      }).save();
      await memberSchema.findOneAndUpdate(
        MemberId,
        {
          $push: {
            Watched_movies: { movieID, movieName, watching_date: Date.now() },
          },
        },
        { new: true }
      );
      return resolve({ error: false, newSubscription });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const getMemberSubscriptions = (MemberId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allSubscriptions = await subscriptionSchema.find({
        MemberId,
      });
      console.log(allSubscriptions);

      return resolve({ error: false, allSubscriptions });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

module.exports = { addSubscription, getMemberSubscriptions };
