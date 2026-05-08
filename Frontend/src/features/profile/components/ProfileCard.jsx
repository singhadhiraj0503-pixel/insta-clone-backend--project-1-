import React from "react";
import useProfile from "../hooks/useProfile";

const ProfileCard = () => {
  const { profile } = useProfile();

  if (!profile) {
    return <h1>Loading Profile....</h1>;
  }

  return (
    <div>
      <img src={profile.profileImage} alt="" />
      <h1 className="text-4xl text-center py-3">{profile.username}</h1>
      <p className="text-2xl text-center underline">{profile.bio}</p>
    </div>
  );
};

export default ProfileCard;
