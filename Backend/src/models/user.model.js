const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Uername already Exists"],
    required: [true, "Username is Required"],
  },
  email: {
    type: String,
    unique: [true, "Email already Exists"],
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    select: false,
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/marteeen/default_user.jpg",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
