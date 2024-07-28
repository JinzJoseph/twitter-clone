import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllTweet } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  console.log(id)
  const dispatch = useDispatch();
  const {refresh}=useSelector((state)=>state.tweet)
  useEffect(() => {
    const fetchMyTweet = async () => {
      try {
        const res = await axios.get(`/api/v1/tweet/getalltweet/${id}`);

        console.log(res);
        dispatch(getAllTweet(res.data.tweets));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyTweet();
  }, [id,refresh]);
};

export default useGetMyTweets;
