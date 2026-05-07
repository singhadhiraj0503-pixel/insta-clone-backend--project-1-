import React from "react";
import {
  RiHeartLine,
  RiChat1Line,
  RiShareForwardLine,
  RiBookmarkLine,
} from "@remixicon/react";
import { usePost } from "../hooks/usePost";

const Post = ({ user, post, handleLike, handleUnlike, loading }) => {
  // const { handleLike, handleUnlike, loading } = usePost();

  return (
    <div className="post text-white">
      <div className="user flex items-center gap-5 mb-2">
        <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <div className="p-[2px] bg-white rounded-full">
            <img
              className="size-12 object-cover rounded-full"
              src={user.profileImage}
              alt=""
            />
          </div>
        </div>
        <p className="text-xl">{user.username}</p>
      </div>
      <img
        className="w-full h-130 object-center object-cover"
        src={post.imgUrl}
        alt=""
      />
      <div className="bottom">
        <div className="icons flex justify-between items-center mt-2">
          <div className="left flex gap-3">
            <button
              className="active:scale-95"
              onClick={() => {
                post.isLiked ? handleUnlike(post._id) : handleLike(post._id);
              }}
            >
              <RiHeartLine className={post.isLiked ? "like" : ""} size={32} />
            </button>
            <button>
              <RiChat1Line size={32} />
            </button>
            <button>
              <RiShareForwardLine size={32} />
            </button>
          </div>
          <div className="right">
            <button>
              <RiBookmarkLine size={32} />
            </button>
          </div>
        </div>
        <p className="text-xl mt-2 py-5">{post.caption}</p>
      </div>
    </div>
  );
};

export default Post;
