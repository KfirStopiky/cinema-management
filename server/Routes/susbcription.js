const express = require("express");
const router = express.Router();
const subscriptionBL = require("../BLs/subscriptionBL");

router.get("/", async (req, res, next) => {
  let resp = await subscriptionBL.getSubscriptionsByMovie("62f9317fa6058ce369f46c0e");
  res.json(resp);
});
// router.get("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   let resp = await moviesBL.getMovie(id);
//   res.json(resp);
// });
router.post("/", async (req, res, next) => {
  // console.log(req.body.MemberId);
  let { MemberId, Movies } = req.body;
  let resp = await subscriptionBL.addSubscription(MemberId, Movies);
  res.json(resp);
});

module.exports = router;
