import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    imageFiles: [],
    // preview: null,
    // previewIndex: 0,
}
export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        selectImageFiles: (state, action) => {
            state.imageFiles = action.payload;
            // state.preview = (action.payload.length !== 0) ? action.payload[0]: null;
            // state.previewIndex = 0;
        },
        // handleDialogClose: (state, action) => {
        //     state.open = false;
        //     state.style = {};
        // }
    }
});
export const { selectImageFiles } = fileSlice.actions