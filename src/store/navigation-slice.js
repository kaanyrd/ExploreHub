import { createSlice } from "@reduxjs/toolkit";

const initialValue = { toggle: false };

const NavigationSlice = createSlice({
  name: "navigationslice",
  initialState: initialValue,
  reducers: {
    closeToggle(action, state) {
      action.toggle = false;
    },
    openToggle(action, state) {
      action.toggle = true;
    },
  },
});

export const NavigationAction = NavigationSlice.actions;
export default NavigationSlice.reducer;
