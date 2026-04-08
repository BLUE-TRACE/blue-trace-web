import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/api";
import { apiClient } from "../../services/apiClient";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    return await apiClient(`${BASE_URL}/users`);
  }
);