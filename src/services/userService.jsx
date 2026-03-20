import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { useAuthManager } from '../utils/security/authManager';

const { retrieveSession } = useAuthManager();

export const getUsername = createAsyncThunk(
    'user/getUserName',
    async (_, { rejectWithValue }) => {
        try {
            const userData = retrieveSession();

            const user = userData;
            const userName = user.userName;

            if (userName) {
                return userName
            }
            else {
                return rejectWithValue("User name not found in session");
            }
        } catch (error) {
            return rejectWithValue("Failed to retrieve user session");
        }
    }
);