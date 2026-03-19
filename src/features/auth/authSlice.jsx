import { createSlice } from '@reduxjs/toolkit';

import { useAuthManager } from '../../utils/security/authManager';
import { handleCookie } from '../../utils/hooks/handleCookie'

import { login } from '../../services/authService'

const { saveSecureSession, retrieveSession } = useAuthManager();
const { deleteCookie } = handleCookie();

const authSlice = createSlice({
  name: 'auth',
  initialState: { // Starting point
    user: retrieveSession() || null,
    isLoading: false,
    loginError: null,
  },
  reducers: { // Functions that can be called instantly
    logout: (state) => {
      state.user = null;
      state.loginError = null;
      deleteCookie();
    },
    clearError: (state) => {
      state.loginError = null;
    }
  },
  extraReducers: (builder) => { // Thunk or API lifecycle
    builder
    // In progress
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.loginError = null;
      })
    // Completed
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        
        // user data save to cookie 
        saveSecureSession(action.payload);
      })
    // Error
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload; 
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;