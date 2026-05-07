import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { createPost, getFeed, likePost, unlikePost } from "../service/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setloading, post, setpost, feed, setfeed } = context;

  const handleGetFeed = async () => {
    setloading(true);
    const data = await getFeed();
    setfeed(data.posts);
    setloading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setloading(true);
    const data = await createPost(imageFile, caption);
    setfeed([data.post, ...feed]);
    setloading(false);
  };

  const handleLike = async (post) => {
    const data = await likePost(post);
    await handleGetFeed();
  };

  const handleUnlike = async (post) => {
    const data = await unlikePost(post);
    await handleGetFeed();
  };

  // useEffect(() => {
  //   handleGetFeed();
  // }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnlike,
  };
};
