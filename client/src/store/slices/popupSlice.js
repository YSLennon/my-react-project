import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '둥근해가 떴습니다.'
}
export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        handleOpen: (state, action) => {
            state.open = true;
            state.message = action.payload;
        },
        handleClose: (state, action) => {
            state.open = false;
            state.message = '';
        }
    }
});
export const { handleOpen, handleClose } = popupSlice.actions