import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
const Tweet = () => {
  return (
    <div className="ml-2 p-3 border-b border-gray-200">
      <div>
        <div className="flex  ">
          <Avatar
            src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
            size="50"
            round={true}
            className="mr-3"
          />
          <div className="w-full ">
            <div className="flex gap-2 items-center ml-2">
              <h1 className="font-bold">Jins Joseph</h1>
              <p className="text-gray-500 text-sm">@jinsjoseph</p>
              <p className="text-gray-500 text-sm">1m</p>
            </div>
            <div>
              <p>hallo developer let connect and growm together</p>
            </div>
            <div className="flex justify-between my-3 cursor-pointer ">
              <div className="flex items-center ">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <AiOutlineLike size="20px" />
                </div>{" "}
                <p className="ml-1">0</p>
              </div>
              <div className="flex items-center ">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment />
                </div>{" "}
                <p className="ml-1">0</p>
              </div>
              <div className="flex  items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <CiBookmark />
                </div>
                <p className="ml-1">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
