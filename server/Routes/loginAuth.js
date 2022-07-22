const express = require("express");
const router = express.Router();
const loginBL = require("../BLs/loginBL");

router.get("/", (req, res) => {
  res.json("hey");
});

// router.post("/", async (req, res) => {
//   let resp = loginBL.login();
//   console.log(resp);
//   res.json(resp);
// });

module.exports = router;
