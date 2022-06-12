const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is requried"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Full name is requried"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Email is already taken"],
      lowercase: true,
      trim: true,
      required: [true, "Email is not provided"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "{VALUE} is not a valid email!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is requried"],
    },
    role: {
      type: String,
      default: "user",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
