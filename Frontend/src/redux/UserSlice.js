import { createReducer, createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUser: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
export const { getOtherUser, getUser, getMyProfile } = UserSlice.actions;
export default UserSlice.reducer;
