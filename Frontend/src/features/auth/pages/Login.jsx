import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  // const { handleLogin, loading } = useAuth();
  const { user, loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await handleLogin(username, password);
    console.log("user logged in !!");
    navigate("/");

    // let { data } = await axios.post(
    //   "http://localhost:3000/api/auth/login",
    //   {
    //     username,
    //     password,
    //   },
    //   { withCredentials: true },
    // );

    // console.log(data);
  };

  return (
    <main className="w-full h-screen p-4 flex items-center justify-center">
      <div className="form-container text-center">
        <h1 className="text-3xl font-semibold mb-3">Login</h1>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-5">
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            className="w-100 border border-black px-4 py-2 outline-0 rounded"
            type="text"
            name="username"
            id=""
            placeholder="Enter Username"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            className="w-100 border border-black px-4 py-2 outline-0 rounded"
            type="text"
            name="password"
            id=""
            placeholder="Enter Password"
          />
          <button
            className="px-4 py-2 bg-gray-600 text-white text-xl rounded active:scale-95"
            type="submit"
          >
            Submit
          </button>
        </form>

        <p className="text-lg mt-3">
          Dont have an Account?{" "}
          <Link className="font-bold underline" to="/register">
            Register
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
