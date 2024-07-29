import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllTweet } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  console.log(id);
  const dispatch = useDispatch();
  //const {isActive}=useSelector((state)=>state.tweet)
  const { refresh,isActive } = useSelector((state) => state.tweet);
  const handlefollowingtweet = async () => {
    try {
      const res = await axios.get(`/api/v1/tweet/getallfollowingtweet/${id}`);
      console.log(res);
      dispatch(getAllTweet(res.data.tweet));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMyTweet = async () => {
    try {
      const res = await axios.get(`/api/v1/tweet/getalltweet/${id}`);

      console.log(res);
      dispatch(getAllTweet(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(isActive){
      fetchMyTweet();
    }else{
      handlefollowingtweet();
    }
   
   
  }, [id, refresh,isActive]);
};

export default useGetMyTweets;
