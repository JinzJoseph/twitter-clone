import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/UserSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`/api/v1/user/myprofile/${id}`);

        //console.log(res);
        dispatch(getMyProfile(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProfile();
  }, [id]);
};

export default useGetProfile;
