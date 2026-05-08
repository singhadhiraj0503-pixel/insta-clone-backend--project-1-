const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/post.middleware");

const userRouter = express.Router();

userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);

userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowUserController,
);

userRouter.get(
  "/follow-requests/pending",
  identifyUser,
  userController.listPendingFollowRequestsController,
);

userRouter.post(
  "/follow-requests/:username/accept",
  identifyUser,
  userController.acceptFollowRequestController,
);

userRouter.post(
  "/follow-requests/:username/reject",
  identifyUser,
  userController.rejectFollowRequestController,
);

userRouter.get(
  "/profile/:username",
  identifyUser,
  userController.getProfileCOntroller,
);

userRouter.get(
  "/followers/:username",
  identifyUser,
  userController.getFollowerController,
);

userRouter.get(
  "/following/:username",
  identifyUser,
  userController.getFollowingController,
);

module.exports = userRouter;
