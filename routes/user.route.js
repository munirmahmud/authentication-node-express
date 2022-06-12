const express = require("express");
const { signup, signin, getUsers, getUser } = require("../controllers/auth.controller.js");
const verifyJwtToken = require("../middlewares/auth.jwt.js");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/profiles").get(verifyJwtToken, getUsers);
router.route("/profiles/:id").get(verifyJwtToken, getUser);

module.exports = router;
