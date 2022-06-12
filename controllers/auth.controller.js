const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

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

exports.signin = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: err,
      });
    }

    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "No user found",
        errorMessage: err,
      });
    }

    // Comparing passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    // checking if password is valid and send response back
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Email/Password is invalid.",
        token: null,
      });
    }

    // Signin token with user ID
    const { _id, email, username } = user;
    const token = jwt.sign(
      {
        id: _id,
        email,
        username,
      },
      process.env.SIGNATURE,
      { expiresIn: "1h" }
    );

    //responding to client request with user profile success message and  access token .
    res.status(200).json({
      status: 200,
      success: true,
      message: "Login successful.",
      token,
    });
  });
};
