const subscriptionSchema = require("../Models/subscriptionsModel");
const memberSchema = require("../Models/memberModel");
const movieSchema = require("../Models/movieModel");

const addSubscription = (MemberId, movieID, watching_date, memberName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let watchedMovie = await movieSchema.findById(movieID);
      let newSubscription = await new subscriptionSchema({
        MemberId,
        Movie: { movieID, movieName: watchedMovie.Name },
        watching_date,
      }).save();
      await memberSchema.findOneAndUpdate(
        MemberId,
        {
          $push: {
            Watched_movies: {
              movieID,
              movieName: watchedMovie.Name,
              watching_date,
            },
          },
        },
        { new: true }
      );
      let movie = await movieSchema.findOneAndUpdate(
        { movieID },
        {
          $push: {
            Subscriptions_watched: {
              memberID: MemberId,
              memberName,
              date: watching_date,
            },
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

      return resolve({ error: false, allSubscriptions });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

module.exports = { addSubscription, getMemberSubscriptions };
