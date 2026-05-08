const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "User Cannot follow itself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User does not Exists",
    });
  }

  const existing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (existing) {
    if (existing.status === "accepted") {
      return res.status(200).json({
        message: `Already following ${followeeUsername}`,
        follow: existing,
      });
    }
    if (existing.status === "pending") {
      return res.status(200).json({
        message: `Follow request to ${followeeUsername} is already pending`,
        follow: existing,
      });
    }
    existing.status = "pending";
    await existing.save();
    return res.status(200).json({
      message: `Follow request sent to ${followeeUsername}`,
      follow: existing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  res.status(201).json({
    message: `Follow request sent to ${followeeUsername}`,
    follow: followRecord,
  });
};

const acceptFollowRequestController = async (req, res) => {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  if (followeeUsername === followerUsername) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const requestDoc = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  if (!requestDoc) {
    return res.status(404).json({
      message: "No pending follow request from this user",
    });
  }

  requestDoc.status = "accepted";
  await requestDoc.save();

  res.status(200).json({
    message: `You accepted ${followerUsername}'s follow request`,
    follow: requestDoc,
  });
};

const rejectFollowRequestController = async (req, res) => {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  if (followeeUsername === followerUsername) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const requestDoc = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  if (!requestDoc) {
    return res.status(404).json({
      message: "No pending follow request from this user",
    });
  }

  requestDoc.status = "rejected";
  await requestDoc.save();

  res.status(200).json({
    message: `You rejected ${followerUsername}'s follow request`,
    follow: requestDoc,
  });
};

const listPendingFollowRequestsController = async (req, res) => {
  const followeeUsername = req.user.username;

  const pending = await followModel.find({
    followee: followeeUsername,
    status: "pending",
  });

  res.status(200).json({
    message: "Pending follow requests",
    requests: pending,
  });
};

const unfollowUserController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
};

const getProfileCOntroller = async (req, res) => {
  const username = req.params.username;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "Profile Fetched Successfully",
    user: {
      profileImage: user.profileImage,
      username: user.username,
      bio: user.bio,
    },
  });
};

const getFollowerController = async (req, res) => {
  const username = req.params.username;

  const followers = await followModel.find({
    followee: username,
    status: "accepted",
  });

  if (!followers) {
    return res.status(401).json({
      message: "0 Followers",
    });
  }

  res.status(200).json({
    message: "Followers fetched Successfully",
    followers,
  });
};

const getFollowingController = async (req, res) => {
  const username = req.params.username;

  const following = await followModel.find({
    follower: username,
    status: "accepted",
  });

  if (!following) {
    return res.status(401).json({
      message: "0 Following",
    });
  }

  res.status(200).json({
    message: "Following fetched Successfully",
    following,
  });
};

module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  listPendingFollowRequestsController,
  getProfileCOntroller,
  getFollowerController,
  getFollowingController,
};
