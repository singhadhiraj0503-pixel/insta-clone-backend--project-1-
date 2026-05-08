import { useContext, useEffect } from "react";
import { ProfileContext } from "../profile.context";
import {
  getFollowers,
  getFollowing,
  getProfile,
} from "../services/profile.api";

const useProfile = () => {
  const context = useContext(ProfileContext);

  const {
    profile,
    setprofile,
    followers,
    setfollowers,
    following,
    setfollowing,
  } = context;

  const username = "test-2";

  const handleProfile = async () => {
    const data = await getProfile(username);
    setprofile(data.user);
  };

  const handleFollowers = async () => {
    const data = await getFollowers(username);
    setfollowers(data.followers);
  };

  const handleFollowing = async () => {
    const data = await getFollowing(username);
    setfollowing(data.following);
  };

  useEffect(() => {
    handleProfile();
    handleFollowers();
    handleFollowing();
  }, []);

  return {
    handleProfile,
    handleFollowers,
    handleFollowing,
    profile,
    followers,
    following,
  };
};

export default useProfile;
