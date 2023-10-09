import { createSlice } from "@reduxjs/toolkit";

const initialValue = { sidebar: false };

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialValue,
  reducers: {
    closeSide(state, action) {
      state.sidebar = false;
    },
    openSide(state, action) {
      state.sidebar = true;
    },
  },
});

export const sideBarAction = sidebarSlice.actions;

export default sidebarSlice.reducer;
