const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  // console.log(req.body, req.file);

  // const token = req.cookies.token;

  // if (!token) {
  //   return res.status(401).json({
  //     message: "Token not provided, Unauthorized Access",
  //   });
  // }

  // let decoded = null;
  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   return res.status(401).json({
  //     message: "User not Authorized",
  //   });
  // }
  // console.log(decoded);

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "dehati-crime-patrol.png",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post Created Successfully !!",
    post,
  });
};

const getPostController = async (req, res) => {
  // const token = req.cookies.token;

  // if (!token) {
  //   return res.status(409).json({
  //     message: "Unauthorized Access",
  //   });
  // }

  // let decoded;
  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   return res.status(401).json({
  //     message: "Invalid Token",
  //   });
  // }
  // console.log(decoded);

  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Post Fetched Successfully",
    posts,
  });
};

const getPostDetailsController = async (req, res) => {
  // const token = req.cookies.token;

  // if (!token) {
  //   return res.status(409).json({
  //     message: "Unauthorized Access",
  //   });
  // }

  // let decoded;
  // try {
  //   decoded = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   return res.status(401).json({
  //     message: "Invalid Token",
  //   });
  // }

  const userId = req.user.id;
  const postId = req.params.postId;

  console.log(userId);
  console.log(postId);

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not Found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  res.status(200).json({
    message: "Posts Fetched Successfully",
    post,
  });
};

const likePostController = async (req, res) => {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not fount",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post Liked Successfully",
    like,
  });
};

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
};
