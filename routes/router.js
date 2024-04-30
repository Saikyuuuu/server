const express = require("express");
const usercontroller = require("../controllers/UserController");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("Hello world");
});

router.get("/alluser", usercontroller.getalluser);
router.post("/adduser", usercontroller.addnewuser);
router.post("/deleteuser", usercontroller.deleteuser);
router.post("/updateuser", usercontroller.updateuser);

module.exports = router;
