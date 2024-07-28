import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUser } from "../redux/UserSlice";

const useOtherUser = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const res = await axios.get(`/api/v1/user/getotheruser/${id}`);

        //console.log(res);
        dispatch(getOtherUser(res.data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUser();
  }, [id]);
};

export default useOtherUser;
