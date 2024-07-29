import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from "../redux/tweetSlice";

const Tweet = ({ items }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `/api/v1/tweet/like/${id}`,
        { id: user?._id },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `/api/v1/tweet/deleteTweet/${id}`,
        {},
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(getRefresh());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ml-2 p-3 border-b border-gray-200">
      <div>
        <div className="flex">
          <Avatar
            src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
            size="50"
            round={true}
            className="mr-3"
          />
          <div className="w-full">
            <div className="flex gap-2 items-center ml-2">
              <h1 className="font-bold">{items?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm">
                @{items?.userDetails[0]?.username}
              </p>
              <p className="text-gray-500 text-sm">1m</p>
            </div>
            <div>
              <p>{items?.description}</p>
            </div>
            <div className="flex justify-between my-3 cursor-pointer">
              <div className="flex items-center">
                <div
                  className="p-2 hover:bg-green-200 rounded-full cursor-pointer"
                  onClick={() => likeOrDislikeHandler(items?._id)}
                >
                  <AiOutlineLike size="20px" />
                </div>
                <p className="ml-1">{items?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment />
                </div>
                <p className="ml-1">0</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <CiBookmark />
                </div>
                <p className="ml-1">0</p>
              </div>
              {user?._id === items?.userId && (
                <div className="flex items-center">
                  <div
                    className="p-2 hover:bg-red-200 rounded-full cursor-pointer"
                    onClick={() => handleDelete(items._id)}
                  >
                    <MdDelete />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
