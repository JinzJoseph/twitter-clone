import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import {Link }  from "react-router-dom"
const RightSideBar = ({ otherUsers }) => {
  return (
    <div className="w-[25%] mx-auto container ml-6  ">
      <div className="">
        <div className=" flex items-center p-2 bg-gray-100 rounded-full outline-none ">
          <CiSearch size="20px" />
          <input
            type="text"
            className="bg-transparent outline-none px-2"
            placeholder="Search..."
          />
        </div>
        <div className="p-4 bg-gray-200 rounded-2xl my-4">
          <h1 className="font-bold text-lg  my-3">who to follow</h1>
          {otherUsers?.map((item, index) => {
            return (
              <div className="flex items-center justify-between m-5 " key={index}>
                <div className="flex">
                  <div>
                    <Avatar
                      src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                      size="50"
                      round={true}
                      className="mr-3"
                    />
                  </div>

                  <div className=" ml-2">
                    <h1 className="font-bold">{item.name}</h1>
                    <p className="text-sm">@{item.username}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${item._id}`}>
                  <button className="px-4 py-1 bg-black text-white rounded-full">Profile
                  </button>
                  </Link>
                 
                    
               
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
