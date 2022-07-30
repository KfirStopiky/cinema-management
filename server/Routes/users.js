const express = require("express");
const router = express.Router();
const usersBL = require("../BLs/usersBL");

router.get("/", async (req, res, next) => {
  let resp = await usersBL.getAllUsers();
  res.send(resp);
});

module.exports = router;
