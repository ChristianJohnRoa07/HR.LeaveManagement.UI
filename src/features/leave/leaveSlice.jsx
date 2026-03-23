import { createSlice } from '@reduxjs/toolkit';

import {
    getUserLeaveAllocations
} from '../../services/leaveAllocationService';

import {
    applyLeaveRequest,
    getUserLeaveRequests,
    updateLeaveRequest,
    deleteLeaveRequest,
} from '../../services/leaveRequestService';

import {
    getLeaveTypes
} from '../../services/leaveTypeService';

const initialLeaveFormState = {
    leaveTypeId: '',
    startDate: '',
    endDate: '',
    requestedComments: ''
};

const leaveSlice = createSlice({
    name: 'leave',
    initialState: {
        createLeaveForm: initialLeaveFormState,
        updateLeaveForm: initialLeaveFormState,
        sickDays: null,
        vacationDays: null,
        totalAllocatedDays: null,
        leaveRequests: [],
        leaveTypes: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        handleCreateFormField: (state, action) => {
            const { name, value } = action.payload;
            state.createLeaveForm[name] = value;
        },
        handleUpdateFormField: (state, action) => {
            const { name, value } = action.payload;
            state.updateLeaveForm[name] = value;
        },
        clearCreateForm: (state) => {
            state.createLeaveForm = initialLeaveFormState;
        },
        clearUpdateForm: (state) => {
            state.updateLeaveForm = initialLeaveFormState;
        },
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

                // Clear leave inputs
                state.createLeaveForm = initialLeaveFormState;
            })
            .addCase(applyLeaveRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateLeaveRequest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateLeaveRequest.fulfilled, (state, action) => {
                state.isLoading = false;

                // Clear leave inputs
                state.updateLeaveForm = initialLeaveFormState;
            })
            .addCase(updateLeaveRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteLeaveRequest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteLeaveRequest.fulfilled, (state, action) => {
                state.isLoading = false;

            })
            .addCase(deleteLeaveRequest.rejected, (state, action) => {
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

export const { clearError, handleCreateFormField, handleUpdateFormField, clearUpdateForm, clearCreateForm, resetForm } = leaveSlice.actions;
export default leaveSlice.reducer;