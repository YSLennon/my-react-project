import { configureStore } from '@reduxjs/toolkit';
import { popupSlice } from './slices/popupSlice';
import { userSlice } from './slices/userSlice';

export const store = configureStore({
    reducer: {
        popup: popupSlice.reducer,
        user: userSlice.reducer,
    }
})