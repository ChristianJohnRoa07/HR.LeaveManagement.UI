import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import leaveReducer from '../features/leave/leaveSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        leave: leaveReducer
    }
})