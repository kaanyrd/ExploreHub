import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from "./sidebar-slice";
import profileInfoSlice from "./profileInfo-slice";
import navigationSlice from "./navigation-slice";

const store = configureStore({
  reducer: {
    sidebar: sideBarSlice,
    profileSide: profileInfoSlice,
    navigationSlice: navigationSlice,
  },
});

export default store;
