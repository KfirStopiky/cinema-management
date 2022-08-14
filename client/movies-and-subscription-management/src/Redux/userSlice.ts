import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      _id: "",
      firstName: "",
      lastName: "",
      permissions: {},
      userName: "",
      sessionTimeOut: "",
      updatedAt: "",
      isLoggedIn: false,
    },
  },

  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
    },
    LOGOUT: (state) => {
      state.user = {
        _id: "",
        firstName: "",
        lastName: "",
        permissions: {},
        userName: "",
        sessionTimeOut: "",
        updatedAt: "",
        isLoggedIn: false,
      };
    },
    UPDATE: (state, action) => {
      state.user.permissions = action.payload;
    },
  },
});

export const { LOGIN, LOGOUT, UPDATE } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
