"use client"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: {
    name: typeof window !== "undefined" ? localStorage.getItem("userName") : null,
    email: typeof window !== "undefined" ? localStorage.getItem("userEmail") : null,
  },
  token: typeof window !== "undefined" ? localStorage.getItem("userToken") : null,
  isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("userToken"),
  status: "idle",
  error: null,
};

// Define the user details response type
interface UserDetailsResponse {
  user:{
    name: string;
    email: string;
  }
}

// Fetch user details if token is available
export const fetchUserDetails = createAsyncThunk<UserDetailsResponse>(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      return rejectWithValue("No token found.");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/user/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        console.log("User details fetched successfully:", result); // Debug
        return result as UserDetailsResponse;
      } else {
        return rejectWithValue(result.message || "Failed to fetch user details.");
      }
    } catch (e) {
      console.error("Fetch user details error:", e);
      return rejectWithValue(e);
    }
  }
);

interface LoginResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

// Define the login form data type
interface LoginData {
  email: string;
  password: string;
}
export const loginUser = createAsyncThunk<LoginResponse, LoginData>(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        return result as LoginResponse;
      } else {
        return rejectWithValue(result.message || "Login failed.");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user.name = null;
      state.user.email = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
    },
  },
  
  extraReducers: (builder) => {
    // Handle user login

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = "succeeded";
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // Persist user information in localStorage
        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userName", action.payload.user.name);
        localStorage.setItem("userEmail", action.payload.user.email);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Handle fetching user details
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserDetailsResponse>) => {
        state.status = "succeeded";
        console.log("Setting user details to state:", action.payload); // Debug
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Define selectors to access user data globally
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectToken = (state: { user: UserState }) => state.user.token;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;
export const selectUserError = (state: { user: UserState }) => state.user.error;

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
