import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";
import Avatar from "react-avatar";
import { FaFileImage } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllTweet, getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const id = user._id;
  const [desc, setDesc] = useState("");
  const { isActive } = useSelector((state) => state.tweet);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/tweet/create",
        { desc, id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(getRefresh());

      if (res.data.success) {
        toast.success(res.data.message);
        setDesc(""); // Clear the description after successful post
      } else {
        toast.error("Failed to create tweet");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the tweet");
    }
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-full mx-auto">
      <div className="my-3 w-full">
        <div className="flex items-center justify-between border-b border-gray-300">
          <div
            onClick={forYouHandler}
            className={`cursor-pointer hover:bg-gray-400 w-[30%] text-center p-4 ${isActive ? "border-b-4 border-blue-600" : ""}`}
          >
            <h1 className="font-bold text-gray-700 text-lg">For You</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`cursor-pointer hover:bg-gray-400 w-[30%] text-center p-4 ${!isActive ? "border-b-4 border-blue-600" : ""}`}
          >
            <h1 className="font-bold text-gray-700 text-lg">Following</h1>
          </div>
          <div className="cursor-pointer hover:bg-gray-400 ml-auto p-4">
            <IoSettings className="text-2xl text-gray-700" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <div className="ml-2 p-3 items-center">
              <Avatar
                src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                size="50"
                round={true}
                className="mr-3"
              />
            </div>
            <input
              type="text"
              className="w-full outline-none border-none text-lg"
              placeholder="What is happening"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between my-4 ml-2 p-3 border-b border-gray-300">
            <div>
              <FaFileImage size="24px" />
            </div>
            <button
              type="submit"
              className="bg-blue-400 px-4 py-1 text-lg rounded-full text-white text-end border-none"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
