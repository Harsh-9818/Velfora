const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid address"],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  }
});
