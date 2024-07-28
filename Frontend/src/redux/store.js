import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import tweetSlice from "./tweetSlice";
const store = configureStore({
  reducer: {
    user: UserSlice,
    tweet:tweetSlice
  },
});
export default store;
