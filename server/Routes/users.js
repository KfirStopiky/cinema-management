const express = require("express");
const router = express.Router();
const usersBL = require("../BLs/usersBL");

router.get("/", async (req, res, next) => {
  let resp = await usersBL.getAllUsers();
  res.send(resp);
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let resp = await usersBL.getUser(id);
  console.log(resp);
  res.send(resp);
});
router.put("/:id", async (req, res, next) => {
  let resp = await usersBL.getAllUsers();
  res.send(resp);
});

router.delete("/", async (req, res, next) => {
  const { id } = req.body;
  let resp = await usersBL.deleteUser(id);
  res.send(resp);
});
router.post("/", async (req, res, next) => {
  const { id } = req.body;
  let resp = await usersBL.deleteUser(id);
  res.send(resp);
});

module.exports = router;
