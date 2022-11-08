import { createSlice } from "@reduxjs/toolkit"

const initialState = {
isLoading: false
}

export const {reducer: loadingReducer, actions: loadingAction} = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        displayLoading: (state,action) => { 
            state.isLoading = true
        },
        hideLoading:  (state,action) => { 
            state.isLoading = false
        },

    },
    extraReducers: (builder) => {

    }

})