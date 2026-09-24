import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isError: null,
};
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/auth/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong during signup",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //signup

    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
