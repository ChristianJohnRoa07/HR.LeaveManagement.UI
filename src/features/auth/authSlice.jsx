import { createSlice } from '@reduxjs/toolkit';

import { useAuthManager } from '../../utils/security/authManager';
import { handleCookie } from '../../utils/hooks/handleCookie';

import { login, register } from '../../services/authService';

const { saveSecureSession, retrieveSession } = useAuthManager();
const { deleteCookie } = handleCookie();

const initialLoginFormState = {
  email: '',
  password: '',
}

const initialRegisterFormState = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { // Starting point
    user: retrieveSession() || null,
    loginForm: initialLoginFormState,
    registerForm: initialRegisterFormState,
    isLoading: false,
    loginError: null,
    registerError: null
  },
  reducers: { // Functions that can be called instantly
    handleLoginFormField: (state, action) => {
      const { field, value } = action.payload;

      state.loginForm[field] = value;
    },
    handleRegisterFormField: (state, action) => {
      const { field, value } = action.payload;

      state.registerForm[field] = value;
    },
    clearLoginForm: (state) => {
      state.loginForm = initialLoginFormState;
    },
    clearRegisterForm: (state) => {
      state.registerForm = initialRegisterFormState;
    },
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

        state.loginForm = initialLoginFormState;

        // user data save to cookie 
        saveSecureSession(action.payload);
      })
      // Error
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload;
      })

      /* --- Register Cases --- */
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.registerForm = initialRegisterFormState;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.payload;
      }); 
  },
});

export const { handleLoginFormField, handleRegisterFormField, clearLoginForm, clearRegisterForm, logout, clearError } = authSlice.actions;
export default authSlice.reducer;