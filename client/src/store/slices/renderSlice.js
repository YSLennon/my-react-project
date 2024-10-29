import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: true,
}
export const renderSlice = createSlice({
    name: 'render',
    initialState,
    reducers: {
        handleRender: (state, action) => {
            state.value = !state.value
        },
    }
});
export const { handleRender } = renderSlice.actions