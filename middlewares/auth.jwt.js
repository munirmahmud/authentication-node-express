const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyToken = (req, res, next) => {
  const { tokenHeaders } = req;
  console.log("tokenHeaders", tokenHeaders);

  const [headers, payload, signature] = req.headers.authorization.split(" ");
  console.log("headers", headers);
  console.log("payload", payload);
  console.log("signature", signature);

  if (req.headers && req.headers.authorization && headers === "JWT") {
    jwt.verify(payload, process.env.SIGNATURE, (err, decode) => {
      if (err) return (req.user = undefined);

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
