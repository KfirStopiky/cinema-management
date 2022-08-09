const express = require("express");
const router = express.Router();
const membersBL = require("../BLs/membersBL");

router.get("/", async (req, res) => {
  let resp = await membersBL.getAllMembers();
  res.send(resp);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let resp = await membersBL.getMember(id);
  res.json(resp);
});

router.post("/", async (req, res, next) => {
  const { name, email, city } = req.body;
  console.log(name, email, city);
  let resp = await membersBL.addMember(name, email, city);
  res.json(resp);
});

router.delete("/", async (req, res, next) => {
  const { id } = req.body;
  let resp = await membersBL.deleteMember(id);
  res.json(resp);
});

router.put("/:id", async (req, res, next) => {
  const { _id, Name, Email, City } = req.body.member;
  console.log({ _id, Name, Email, City });
  let resp = await membersBL.editMember(_id, Name, Email, City);
  res.send(resp);
});

module.exports = router;
