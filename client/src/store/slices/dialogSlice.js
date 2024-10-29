import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    style: {},
    title: '',
    type: '',
    feed: null,
    comments: null,
    images: null,

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
            state.feed = action.payload.feed;
            state.comments = action.payload.comments;
            state.images = action.payload.images;
        },
        handleAddComment: (state, action) => {
            state.comments = action.payload;
        },
        handleDialogClose: (state, action) => {
            state.open = false;
        },
        afterClose: (state, action) => initialState,
    }
});
export const { handleDialogOpen, handleAddComment, handleDialogClose, afterClose } = dialogSlice.actions