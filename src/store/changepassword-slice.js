import { createSlice } from "@reduxjs/toolkit";

const initialValues = { user: null };

const ChangePasswordSlice = createSlice({
  name: "changepasswordslice",
  initialState: initialValues,
  reducers: {
    catchUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state, action) {
      state.user = null;
    },
  },
});

export const ChangePasswordAction = ChangePasswordSlice.actions;

export default ChangePasswordSlice.reducer;
