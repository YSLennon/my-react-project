import { createSlice } from '@reduxjs/toolkit';

const initialState = {value: 1}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers:{
    change: (state, action) => {
      state.value = action.payload},
    plus: (state, action)=>{
      state.value = state.value+1;
    }
  }
})
export const {plus, change} = counterSlice.actions

