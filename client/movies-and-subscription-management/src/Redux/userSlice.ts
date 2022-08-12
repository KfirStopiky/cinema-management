import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
    },
    LOGOUT: (state) => {
      state.user = null;
    },
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
