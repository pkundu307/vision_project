import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user:{
    name: string|null,
    email: string|null,
  };
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user:{
    name: null,
    email: null,
  },
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

// Define the login response type
interface LoginResponse {
 user:{
  name:string,
  email:string,
 }
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
    } catch ( e ) {
      return rejectWithValue( e);
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
        console.log(action.payload);
        
        
        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userName", action.payload.user.name);
        localStorage.setItem("userEmail", action.payload.user.email);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
