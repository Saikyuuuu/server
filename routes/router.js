const express = require("express");
const usercontroller = require("../controllers/UserController");
const router = require("express").Router();
const { check } = require("express-validator");

router.get("/", (req, res, next) => {
  res.send("Hello world");
});

router.get("/alluser", usercontroller.getalluser);
router.post("/adduser", usercontroller.addnewuser);
router.post(
  "/deleteuser",
  [
    check("id")
      .exists()
      .withMessage("id is required")
      .isNumeric()
      .withMessage("id should be only number"),
  ],
  usercontroller.deleteuser
);
router.post(
  "/updateuser",
  [
    check("id")
      .exists()
      .withMessage("id is required")
      .isNumeric()
      .withMessage("id should be only number"),
  ],
  usercontroller.updateuser
);
router.post("/login", usercontroller.loginuser);

module.exports = router;
