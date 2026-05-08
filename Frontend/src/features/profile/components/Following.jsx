import React from "react";
import useProfile from "../hooks/useProfile";

const Following = () => {
  const { following } = useProfile();

  return (
    <div className="text-xl">
      <h1>Following</h1>
      {following.map((item, idx) => {
        return <p key={idx}>{item.followee}</p>;
      })}
    </div>
  );
};

export default Following;
