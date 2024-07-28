import { createSlice } from "@reduxjs/toolkit";
const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweet: null,
    refresh: false,
  },
  reducers: {
    getAllTweet: (state, action) => {
      state.tweet = action.payload;
    },
    getRefresh: (state, action) => {
      state.refresh = !state.refresh;
    },
  },
});
export const { getAllTweet ,getRefresh} = tweetSlice.actions;
export default tweetSlice.reducer;
