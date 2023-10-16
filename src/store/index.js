import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from "./sidebar-slice";
import profileInfoSlice from "./profileInfo-slice";

const store = configureStore({
  reducer: { sidebar: sideBarSlice, profileSide: profileInfoSlice },
});

export default store;
