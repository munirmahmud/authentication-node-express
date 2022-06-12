const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyToken = (req, res, next) => {
  if (req.headers === undefined) {
    return res.status(401).json({ status: 401, success: false, message: "Sorry, no token found" });
  }

  const [headers, payload, signature] = req.headers.authorization?.split(".");

  const tokenType = JSON.parse(atob(headers));

  if (req.headers && req.headers.authorization && tokenType.typ === "JWT") {
    jwt.verify(req.headers.authorization, process.env.SIGNATURE, (err, decode) => {
      if (err && err.name === "TokenExpiredError") {
        return res.json({ error: err });
      }

      if (err?.message) {
        return res.json({ error: err.message });
      }

      User.findOne({ _id: decode.id }).exec((err, user) => {
        if (err) {
          return res.status(500).json({ status: 500, success: false, message: err });
        } else {
          req.user = user;
          next();
        }
      });
    });
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
