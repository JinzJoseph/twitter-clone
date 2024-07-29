import React, { useEffect } from "react";
import LeftSideBar from "./LeftSideBar";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";
import { Outlet, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import useOtherUser from "../hooks/useOtherUser";
import useGetMyTweets from "../hooks/useGetMyTweets";
const Home = () => {
  const navigate = useNavigate();
  const { user, otherUsers } = useSelector((state) => state.user);
  console.log(user);

  useOtherUser(user?._id);
  useGetMyTweets(user?._id);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex justify-between container mx-auto w-full h-full">
      <LeftSideBar />
      <Outlet />
      <RightSideBar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
