import React from "react";
import ProfileProvider from "../profile.context";
import ProfileCard from "../components/ProfileCard";
import Followers from "../components/Followers";
import Following from "../components/Following";

const ProfilePage = () => {
  return (
    <ProfileProvider>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <ProfileCard />
        <Followers />
        <Following />
      </div>
    </ProfileProvider>
  );
};

export default ProfilePage;
