import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import axios from "axios";

const savedToken = localStorage.getItem('token');

const initialState = {
  user: null,
  token: savedToken,
  isAuthenticated: !!savedToken,
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

      

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong during signup",
      );
    }
  },
);


export const login = createAsyncThunk("auth/login", async(data, {rejectWithValue})=>{
try {
  
    const response = await axios.post(`${api}/auth/login`, data);
    console.log(response.data)
    localStorage.setItem('token',response.data.token)
    return response.data;
} catch (error) {
  if (error.response) {
      return rejectWithValue(
        error.response.data?.message || `Server error ${error.response.status}`
      );
    }
}
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout : (state)=>{
      localStorage.removeItem("token");
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    }
  },
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

      //login
      builder
      .addCase(login.pending, (state)=>{
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action)=>{
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isError = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action)=>{
        state.isAuthenticated = false;
        state.isError = action.payload;
        state.isLoading = false;
      })
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
