const express = require("express");
const { signup, signin } = require("../controllers/auth.controller.js");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").get(signin);

module.exports = router;
