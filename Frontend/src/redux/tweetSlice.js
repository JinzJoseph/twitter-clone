import { createSlice } from "@reduxjs/toolkit";
const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweet: null,
    refresh: false,
    isActive:true
  },
  reducers: {
    getAllTweet: (state, action) => {
      state.tweet = action.payload;
    },
    getRefresh: (state, action) => {
      state.refresh = !state.refresh;
    },
    getIsActive:(state,action)=>{
      state.isActive=action.payload
    }
  },
});
export const { getAllTweet,getIsActive ,getRefresh} = tweetSlice.actions;
export default tweetSlice.reducer;
