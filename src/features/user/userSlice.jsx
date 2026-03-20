import { createSlice } from '@reduxjs/toolkit';
import {
    getUsername,
} from '../../services/userService';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "",
        isLoading: false,
        error: null,
    },
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* --- User Cases --- */
            .addCase(getUsername.pending, (state) => {
                state.error = null;
            })
            .addCase(getUsername.fulfilled, (state, action) => {
                state.userName = action.payload;
            })
            .addCase(getUsername.rejected, (state, action) => {
                state.error = action.payload;
            })
    },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;