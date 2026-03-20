import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { useAuthManager } from '../utils/security/authManager';

const { retrieveSession } = useAuthManager();

export const getLeaveTypes = createAsyncThunk(
    'user/getLeaveTypes',
    async (_, { rejectWithValue }) => {

        try {
            // Grab the auth data directly from your existing authSlice state
            const userData = retrieveSession();
            const user = userData

            if (!user || !user.token) {
                return rejectWithValue("No valid session found");
            }

            const response = await axios.get(
                `https://localhost:7047/api/LeaveTypes`,
                {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
            );

            const result = response.data;

            if (result.success) {
                return result.data; // This becomes the action.payload
            } else {
                return rejectWithValue(result.message || "Failed to fetch leave types");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);