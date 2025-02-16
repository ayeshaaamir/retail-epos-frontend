import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "../../utils/cookieUtils";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { token } = await authService.login(
        credentials.username,
        credentials.password
      );
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role_id === 1 ? "admin" : "employee";

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      setCookie("token", token, 7);

      return { token, userRole };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userRole: localStorage.getItem("userRole") || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userRole = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userRole = action.payload.userRole;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
