import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { getMyProfile, getOtherUser, getUser } from "../redux/UserSlice";
import { getAllTweet } from "../redux/tweetSlice";
const LeftSideBar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.user);
  const handleLogout=async()=>{
    try {
      const res=await axios.get("/api/v1/user/logout")
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(getUser(null))
        dispatch(getOtherUser(null))
        dispatch(getMyProfile(null))
        dispatch(getAllTweet(null))
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="h-full w-[20%] ">
      <div className="my-3">
        <div className="ml-5  ">
          <img
            className="w-20"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAce1i99AMQmiCUhhvTEYcEydjTUydOf9FA&s"
            alt=""
          />
        </div>
        <div className="my-5">
          <Link to="/home" className="flex items-center hover:bg-gray-200 my-2 px-4 py-3 rounded-full cursor-pointer ">
            <div className="">
              <IoHomeSharp className="w-7 h-7" />{" "}
            </div>
            <p className="font-semibold text-lg ml-2">Home</p>
          </Link>
          <div className="flex items-center hover:bg-gray-200 my-2 px-4 py-3 rounded-full cursor-pointer ">
            <div className="">
              <FaHashtag className="w-7 h-7" />{" "}
            </div>
            <p className="font-semibold text-lg ml-2">Explore</p>
          </div>
          <div className="flex items-center hover:bg-gray-200 my-2 px-4 py-3 rounded-full cursor-pointer ">
            <div className="">
              <IoNotifications className="w-7 h-7" />{" "}
            </div>
            <p className="font-semibold text-lg ml-2">Notification</p>
          </div>
          <Link to={`/profile/${user._id}`} className="flex items-center hover:bg-gray-200 my-2 px-4 py-3 rounded-full cursor-pointer ">
            <div className="">
              <FaRegUser className="w-7 h-7" />{" "}
            </div>
            <p className="font-semibold text-lg ml-2">Profile</p>
          </Link>
          <div className="flex items-center hover:bg-gray-200 my-2 px-4 py-3 rounded-full cursor-pointer ">
            <div className="">
              <FaBookmark className="w-7 h-7" />{" "}
            </div>
            <p className="font-semibold text-lg ml-2">BookMarks</p>
          </div>
          <div onClick={handleLogout} className="flex items-center hover:bg-gray-200 my-2 px-4 py-3 rounded-full cursor-pointer ">
            <div className="">
              <IoIosLogOut className="w-7 h-7" />{" "}
            </div>
            <p className="font-semibold text-lg ml-2">Logout</p>
          </div>
          <button className="px-4 py-3 my-3 border-none text-md bg-blue-500 w-full rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
