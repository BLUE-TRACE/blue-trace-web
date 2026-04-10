import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/api";
import { apiClient } from "../../services/apiClient";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await apiClient(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      return await apiClient(`${BASE_URL}/register`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);