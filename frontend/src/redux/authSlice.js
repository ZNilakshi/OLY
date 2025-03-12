
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user data from backend
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await axios.get("http://localhost:5000/auth/user", { withCredentials: true });
  return response.data; // Return the user data to be used in the reducer
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      status: "idle", // to manage loading state
      error: null, // to manage any errors
    },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload; // Set user data
      },
      updateProfile: (state, action) => {
        state.user = { ...state.user, ...action.payload }; // Update user profile
      },
      logout: (state) => {
        state.user = null; // Reset user data on logout
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.status = "loading"; // Set loading state
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.status = "idle"; // Reset status to idle when the data is fetched successfully
          state.user = action.payload; // Store user data
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.status = "failed"; // Set status to failed if there is an error
          state.error = action.error.message; // Capture error message
        });
    },
  });
  
  export const { setUser, updateProfile, logout } = authSlice.actions;
  export default authSlice.reducer;
