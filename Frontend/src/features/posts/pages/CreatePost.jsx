import React, { useRef, useState } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [caption, setcaption] = useState("");
  const postImageFieldRef = useRef(null);

  const { loading, handleCreatePost } = usePost();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = postImageFieldRef.current.files[0];

    await handleCreatePost(file, caption);
    navigate("/");
  };

  if (loading) {
    return <h1>Creating Posts...</h1>;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl underline">Create Post</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-5"
        action=""
      >
        <label
          className="border border-black p-1 rounded cursor-pointer mt-10 text-xl"
          htmlFor="postImage"
        >
          Select File
        </label>
        <input
          ref={postImageFieldRef}
          hidden
          className="border border-black p-1 rounded cursor-pointer"
          type="file"
          name="postImage"
          id="postImage"
        />
        <input
          onChange={(e) => {
            setcaption(e.target.value);
          }}
          value={caption}
          className="w-1/2 p-4 rounded-xl border border-black outline-0"
          type="text"
          name="caption"
          id="caption"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white text-2xl rounded cursor-pointer font-bold active:scale-95"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
