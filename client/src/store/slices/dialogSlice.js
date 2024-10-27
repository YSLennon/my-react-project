import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    style: {},
    title: '',
    type: '',

}
export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        handleDialogOpen: (state, action) => {
            state.open = true;
            state.style = action.payload.style;
            state.title = action.payload.title;
            state.type = action.payload.type;
        },
        handleDialogClose: (state, action) => {
            state.open = false;
        },
        afterClose: (state, action) => initialState,
    }
});
export const { handleDialogOpen, handleDialogClose, afterClose } = dialogSlice.actions