import { configureStore } from '@reduxjs/toolkit';
import { popupSlice } from './slices/popupSlice';
import { userSlice } from './slices/userSlice';
import { dialogSlice } from './slices/dialogSlice';
import { fileSlice } from './slices/fileSlice';

export const store = configureStore({
    reducer: {
        popup: popupSlice.reducer,
        user: userSlice.reducer,
        dialog: dialogSlice.reducer,
    }
})