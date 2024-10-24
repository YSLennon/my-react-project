import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // user: {
    //     id: '',
    //     name: '',
    //     phone: '',
    // },
    // isLoggedIn: false,
    token: '',

}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        login: (state, action) => {
            // state.user.id = action.payload.id;
            // state.user.name = action.payload.name;
            // state.user.phone = action.payload.phone;
            // state.isLoggedIn = true;
            state.token = action.payload
        },
        logout: (state, action) => {
            // state.user = {
            //     id: '',
            //     name: '',
            //     phone: '',
            // };
            // state.isLoggedIn = false;
            state.token = ''
        }
    }
})

