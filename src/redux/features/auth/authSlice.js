import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import axios from "axios";

const savedToken = localStorage.getItem("token");

const initialState = {
  user: null,
  token: savedToken,
  isAuthenticated: false,
  isCheckingAuth: !!savedToken,
  isLoading: false,
  isError: null,
};
export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await api.post(`/auth/signup`, data, {
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

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`/auth/login`, data);
      localStorage.setItem("token", response.data.token);
      await dispatch(fetchMe()).unwrap();
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          typeof error === "string"
            ? error
            : error.response.data?.message ||
                `Server error ${error.response.status}`,
        );
      }
    }
  },
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      return rejectWithValue(
        error.response?.data?.message || "Unable to reach server",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
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
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    //login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isError = action.payload;
        state.isLoading = false;
      });

    //fetchMe
    builder
      .addCase(fetchMe.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
        if (!localStorage.getItem("token")) {
          state.token = null;
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
