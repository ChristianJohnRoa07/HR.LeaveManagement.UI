import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { useAuthManager } from '../utils/security/authManager';

const { retrieveSession } = useAuthManager();

export const getUserLeaveRequests = createAsyncThunk(
    'user/getLeaveRequests',
    async (_, { rejectWithValue }) => {

        try {
            // Grab the auth data directly from your existing authSlice state
            const userData = retrieveSession();
            const user = userData

            if (!user || !user.token) {
                return rejectWithValue("No valid session found");
            }

            const response = await axios.get(
                `https://localhost:7047/api/LeaveRequests/${user.id}`,
                {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
            );

            const result = response.data;

            if (result.success) {
                return result.data; // This becomes the action.payload
            } else {
                return rejectWithValue(result.message || "Failed to fetch allocations");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const applyLeaveRequest = createAsyncThunk(
    'user/applyLeaveRequest',
    async (leaveData, { rejectWithValue }) => {

        try {
            // Grab the auth data directly from your existing authSlice state
            const userData = retrieveSession();
            const user = userData

            if (!user || !user.token) {
                return rejectWithValue("No valid session found");
            }

            console.log('employeeId:', user.id)
            console.log('leaveData', leaveData)

            const response = await axios.post(
                `https://localhost:7047/api/LeaveRequests`,
                {
                    employeeId: user.id,
                    startDate: leaveData.startDate,
                    endDate: leaveData.endDate,
                    leaveTypeId: leaveData.leaveTypeId,
                    requestedComments: leaveData.requestedComments
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
            );

            const result = response.data;

            if (result.success) {
                return result.data; // This becomes the action.payload
            } else {
                const apiError = response.data.data?.errors?.[0] || response.data.data?.message;
                return rejectWithValue(apiError || "Submission failed");
            }
        } catch (error) {
            const serverResponse = error.response?.data;
            
            const errorMessage = serverResponse?.data?.errors?.[0] 
                || serverResponse?.data?.message 
                || error.message;

            return rejectWithValue(errorMessage);
        }
    }
);