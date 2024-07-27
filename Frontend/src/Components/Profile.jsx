import React from "react";
import Avatar from "react-avatar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="w-[60%]  mx-auto border border-l border-r">
      <div className="w-full h-58">
        <div className="flex items-center py-5">
          <Link to="/home" className="p-3 rounded-full bg-gray-100">
            <FaArrowLeftLong size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">Jins Joseph</h1>
            <p className="text-gray-500 text-sm">10 posts</p>
          </div>
        </div>
        <div className="w-full relative">
          <div>
            <img
              src="https://png.pngtree.com/background/20230611/original/pngtree-girl-wears-long-hair-and-is-looking-outward-picture-image_3167922.jpg"
              alt="Profile"
              className="w-full h-48 object-fill"
            />
          </div>

          <div className="absolute -bottom-12 border-3   border-white rounded-full ">
            <Avatar
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              size="140"
              round={true}
              className="mr-3"
            />
          </div>
        </div>
        <div className="text-right m-4">
            <button className="px-4 py-1 border rounded-full text-right border-gray-400 hover:bg-gray-400 font-bold text-black"    >Edit Profile</button>
        </div>
        <div className="m-4">
            <h1 className="font-bold text-2xl">Jins Joseph</h1>
            <p>@jinsjoseph</p>
        </div>
        <div className="m-4 text-sm">
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
