import React from "react";
import useProfile from "../hooks/useProfile";

const Followers = () => {
  const { followers } = useProfile();

  return (
    <div className="text-xl py-2">
      <h1>Followers</h1>
      {followers.map((item, idx) => {
        return <p key={idx}>{item.followers}</p>;
      })}
    </div>
  );
};

export default Followers;
