import { createSlice } from "@reduxjs/toolkit";

const initialValue = { toggle: false };

const ProfileInfoSlice = createSlice({
  name: "profileInfo",
  initialState: initialValue,
  reducers: {
    closeProfile(state) {
      state.toggle = false;
    },
    openProfile(state) {
      state.toggle = true;
    },
  },
});

export const ProfileAction = ProfileInfoSlice.actions;

export default ProfileInfoSlice.reducer;
