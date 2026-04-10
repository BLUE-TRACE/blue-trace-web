import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunks/authThunks";

const getInitialAuthState = () => {
  try {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!token || !user) {
      return {
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    }

    return {
      user,
      token,
      loading: false,
      error: null,
    };
  } catch (error) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    return {
      user: null,
      token: null,
      loading: false,
      error: null,
    };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      // Clear auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");

      // Clean up any active lecturer sessions from previous code!
      localStorage.removeItem("sessionId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Login request started...");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("authUser", JSON.stringify(action.payload.user));
        console.log("Login success:", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Login failed:", action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;