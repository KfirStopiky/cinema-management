const express = require("express");
const router = express.Router();
const authBL = require("../BLs/authBL");

router.post("/", async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;
  let resp = await authBL.registerUser(firstName, lastName, userName, password);
  res.send(resp);
});

module.exports = router;
