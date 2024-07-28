import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../redux/UserSlice";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
     // console.log(res);
      dispatch(getUser(res?.data?.user));
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="flex items-center justify-between w-[80%] max-w-4xl ">
        <div className="w-1/2 p-4">
          <img
            className="w-full rounded-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAce1i99AMQmiCUhhvTEYcEydjTUydOf9FA&s"
            alt="Login"
          />
        </div>
        <div className="w-1/2 p-4">
          <h1 className="font-bold text-5xl mb-6">Happening now</h1>
          <h2 className="font-bold text-2xl mb-6">Log in to Twitter</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="outline-none border border-gray-300 px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="outline-none border border-gray-300 px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full text-lg font-bold"
            >
              Log in
            </button>
            <h1>
              Dont have an Account ?
              <Link to="/signup" className="text-blue-400 ml-1">
                signup
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
