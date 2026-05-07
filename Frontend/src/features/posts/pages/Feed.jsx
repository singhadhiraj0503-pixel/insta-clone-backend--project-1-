import React, { useEffect } from "react";

import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Navbar from "../components/Navbar";

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLike, handleUnlike } = usePost();

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
    </div>
  );
};

export default Feed;
