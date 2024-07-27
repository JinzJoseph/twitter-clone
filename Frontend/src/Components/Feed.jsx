import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";

const Feed = () => {
  return (
    <div className="w-[60%] border border-gray-200 ">
      <div className="w-full ">
        <CreatePost />
        <Tweet /> <Tweet /> <Tweet /> <Tweet />
      </div>
    </div>
  );
};

export default Feed;
