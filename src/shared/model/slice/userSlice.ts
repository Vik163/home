import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type UserSchema } from "../types/user";

const initialState: UserSchema = {
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { actions: userAction } = userSlice;
export const { reducer: userReducer } = userSlice;
