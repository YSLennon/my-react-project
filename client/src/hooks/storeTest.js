
import { configureStore } from "@reduxjs/toolkit"
import { counterSlice } from "./TestReduxToolkit"

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})
//combinereducer
//thunk
//applyMiddleware
//composeWithDevTools