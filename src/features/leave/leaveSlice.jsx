import { createSlice } from '@reduxjs/toolkit';

import {
    getUserLeaveAllocations
} from '../../services/leaveAllocationService';

import {
    applyLeaveRequest,
    getUserLeaveRequests
} from '../../services/leaveRequestService';

import {
    getLeaveTypes
} from '../../services/leaveTypeService';

const leaveSlice = createSlice({
    name: 'leave',
    initialState: {
        sickDays: null,
        vacationDays: null,
        totalAllocatedDays: null,
        leaveRequests: [],
        leaveTypes: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
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
            })

            .addCase(applyLeaveRequest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(applyLeaveRequest.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(applyLeaveRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            /* --- Leave Types Cases --- */
            .addCase(getLeaveTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getLeaveTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leaveTypes = action.payload;
            })
            .addCase(getLeaveTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = leaveSlice.actions;
export default leaveSlice.reducer;