import React, { useEffect } from "react";

import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLike, handleUnlike } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return <h1>Feed is Loading...</h1>;
  }

  console.log(feed);

  return (
    <div className="feed-page w-full h-full flex flex-col items-center justify-center py-5">
      <Navbar />
      <div className="feed">
        <div className="posts px-4 py-2">
          {feed.map((post, idx) => {
            return (
              <div className="px-4 py-2 bg-black mb-5 rounded" key={idx}>
                <Post
                  user={post.user}
                  post={post}
                  loading={loading}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/profile");
        }}
        className="px-4 py-2 rounded bg-red-600 text-white font-bold text-3xl active:scale-95 cursor-pointer"
      >
        Profile
      </button>
      <button
        onClick={() => {
          navigate("/login");
        }}
        className="px-4 py-2 rounded bg-pink-500 text-white font-bold text-xl active:scale-95 cursor-pointer mt-3"
      >
        Logout
      </button>
    </div>
  );
};

export default Feed;
