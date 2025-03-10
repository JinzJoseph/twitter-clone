import React from "react";
import Avatar from "react-avatar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import {toast} from "react-toastify"
import { followingupdate } from "../redux/UserSlice";
import { getRefresh } from "../redux/tweetSlice";
const Profile = () => {
  const { profile, user } = useSelector((state) => state.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch=useDispatch()
  const followAndUnfollowHandler=async()=>{
    if(user?.following.includes(id)){
      //unfollow
      try {
        const res=await axios.post(`/api/v1/user/unfollow/${id}`,{id:user?._id},{
          headers:{
            "content-type":"application/json"
          }
        })
        console.log(res)
        dispatch(followingupdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message)
      } catch (error) {
        toast.error("something went wrong")
      }
    }else{
      //follow
      try {
        const res=await axios.post(`/api/v1/user/follow/${id}`,{id:user?._id},{
          headers:{
            "content-type":"application/json"
          }
        })
        console.log(res)
        dispatch(followingupdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message)
      } catch (error) {
        toast.error("something went wrong")
      }
    }
  }
  return (
    <div className="w-[60%]  mx-auto border border-l border-r">
      <div className="w-full h-58">
        <div className="flex items-center py-5">
          <Link to="/home" className="p-3 rounded-full bg-gray-100">
            <FaArrowLeftLong size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.username}</h1>
            <p className="text-gray-500 text-sm">10 posts</p>
          </div>
        </div>
        <div className="w-full relative pb-5">
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
        {user?._id === profile?._id ? (
          <div className="text-right m-4">
            <button className="px-4 py-1 border rounded-full text-right border-gray-400 hover:bg-gray-400 font-bold text-black">
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="text-right m-4">
            <button  onClick={followAndUnfollowHandler}className="px-4 py-1 border rounded-full text-right border-gray-400 bg-black hover:bg-gray-400 font-bold text-white">
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
          </div>
        )}

        <div className="my-10 ">
          <h1 className="font-bold text-2xl">{profile?.username}</h1>
          <p>@{profile?.name}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
