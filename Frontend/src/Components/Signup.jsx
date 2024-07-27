import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast } from "react-toastify"
const Signup = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1//user/signup",
        { name, username, email, password },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="flex items-center justify-center w-[80%] max-w-4xl ">
        <div className="w-1/2 hidden md:block">
          <img
            className="w-full h-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAce1i99AMQmiCUhhvTEYcEydjTUydOf9FA&s"
            alt="Signup"
          />
        </div>
        <div className="w-1/2 p-4">
          <div className="my-5">
            <h1 className="font-bold text-5xl ">Join Twitter today</h1>
          </div>
          <h1 className="m-4 text-2xl font-bold mt-4 mb-5 pb-4">
            Sign up to the Twitter
          </h1>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setname(e.target.value)}
              placeholder="Name"
              className="outline-blue-500 border border-gray-300 px-3 py-2 rounded-full"
            />
            <input
              type="text"
              onChange={(e) => setusername(e.target.value)}
              placeholder="Username"
              className="outline-blue-500 border border-gray-300 px-3 py-2 rounded-full"
            />
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
              className="outline-blue-500 border border-gray-300 px-3 py-2 rounded-full"
            />
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              className="outline-blue-500 border border-gray-300 px-3 py-2 rounded-full"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 py-2 rounded-full text-lg text-white"
            >
              Sign Up
            </button>
            <h1>
              Already Have an Account?{" "}
              <Link className=" text-blue-400 ml-1" to="/login">
                Login
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
