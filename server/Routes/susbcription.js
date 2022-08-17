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
  let { MemberId, movieID, watching_date, memberName } = req.body;
  console.log(MemberId, movieID, watching_date, memberName);
  let resp = await subscriptionBL.addSubscription(
    MemberId,
    movieID,
    watching_date,
    memberName
  );
  res.json(resp);
});

module.exports = router;
