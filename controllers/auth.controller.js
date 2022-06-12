const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

exports.signup = async (req, res) => {
  const { fullName, username, email, role, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({ fullName, username, email, password: hashedPassword, role });
  await user.save((err, user) => {
    if (err) {
      res.status(500).json({ status: 500, message: err, success: false });
    } else {
      res.status(201).json({ status: 201, message: "User registered successfully", success: true });
    }
  });
};
