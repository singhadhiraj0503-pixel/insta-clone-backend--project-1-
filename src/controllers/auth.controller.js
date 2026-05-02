const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  //   const userExistsByEmail = await userModel.findOne({ email });

  //   if (!userExistsByEmail) {
  //     res.status(409).json({
  //       message: "User already exsists by this email !",
  //     });
  //   }

  //   const userExistsByUsername = await userModel.findOne({ username });

  //   if (!userExistsByUsername) {
  //     res.status(409).json({
  //       message: "username already exsists !",
  //     });
  //   }

  const userAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExists) {
    return res.status(409).json({
      message:
        "User already Exists !" +
        (userAlreadyExists.email === email
          ? "Email already Exists"
          : "Username already Exists"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Successfully !!",
    user: {
      profileImage: user.profileImage,
      username: user.username,
      bio: user.bio,
      email: user.email,
    },
  });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(409).json({
      message: "User not found",
    });
  }

  const isPasswordValid = bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
  );

  res.status(200).json({
    message: "User Logged In Successfully",
    user: {
      profileImage: user.profileImage,
      username: user.username,
      bio: user.bio,
      email: user.email,
    },
  });
};

module.exports = {
  registerController,
  loginController,
};
