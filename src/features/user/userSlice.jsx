import { createSlice } from '@reduxjs/toolkit';
import { 
    getUserLeaveAllocations, 
    getUsername, 
    getUserLeaveRequests 
} from '../../services/userService';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "",
        sickDays: null,
        vacationDays: null,
        totalAllocatedDays: null,
        leaveRequests: [],
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

            /* --- Leave Allocations Cases --- */
            .addCase(getUserLeaveAllocations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserLeaveAllocations.fulfilled, (state, action) => {
                state.isLoading = false;
                const { allocations, totalAllocatedDays } = action.payload;

                state.totalAllocatedDays = totalAllocatedDays;

                state.vacationDays = allocations.find(a => a.leaveType.name === "Vacation")?.numberOfDays || 0;
                state.sickDays = allocations.find(a => a.leaveType.name === "Sick")?.numberOfDays || 0;

            })
            .addCase(getUserLeaveAllocations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            /* --- Leave Requests Cases --- */
            .addCase(getUserLeaveRequests.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserLeaveRequests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leaveRequests = action.payload.leaveRequests;
            })
            .addCase(getUserLeaveRequests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;