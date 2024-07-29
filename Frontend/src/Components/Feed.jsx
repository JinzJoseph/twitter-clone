import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

const Feed = () => {
  const { tweet } = useSelector((state) => state.tweet);
  console.log(tweet);
  return (
    <div className="w-[60%] border border-gray-200 ">
      <div className="w-full ">
        <CreatePost />
        {tweet?.map((item, index) => (
          <Tweet key={index} items={item} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
