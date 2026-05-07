import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between px-10 py-3">
      <p className="text-3xl underline font-bold">Instagram-Clone</p>
      <button
        onClick={() => {
          navigate("/create-post");
        }}
        className="text-xl px-4 py-2.5 bg-emerald-500 rounded active:scale-95"
      >
        Create Post (+)
      </button>
    </div>
  );
};

export default Navbar;
