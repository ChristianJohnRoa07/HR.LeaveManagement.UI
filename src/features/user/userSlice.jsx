import { createSlice } from '@reduxjs/toolkit';
import { getUserLeaveAllocations, getUsername } from '../../services/userService';

export { getUserLeaveAllocations, getUsername }

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "",
        sickDays: null,
        vacationDays: null,
        totalAllocatedDays: null,
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
            });

            /* --- Leave Requests Cases --- */
    },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;