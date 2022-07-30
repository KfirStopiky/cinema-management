const express = require("express");
const router = express.Router();
const authBL = require("../BLs/authBL");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  let resp = await authBL.login(req, userName, password);
  res.send(resp);
});

module.exports = router;
