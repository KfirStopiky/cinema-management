const express = require("express");
const router = express.Router();
const subscriptionBL = require("../BLs/subscriptionBL");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let resp = await subscriptionBL.getMemberSubscriptions(id);
  console.log(resp);
  res.json(resp);
});

router.post("/", async (req, res, next) => {
  let { MemberId, movieID, movieName, watching_date } = req.body;
  let resp = await subscriptionBL.addSubscription(
    MemberId,
    movieID,
    movieName,
    watching_date
  );
  res.json(resp);
});

module.exports = router;
