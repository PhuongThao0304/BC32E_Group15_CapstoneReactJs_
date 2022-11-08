import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { isUndefined } from "lodash"
import { Navigate, useNavigate } from "react-router-dom"
import { userManageService } from "../../services/userManageService"




let user = {

}

if (localStorage.getItem('User_Login')){
    user = JSON.parse(localStorage.getItem('User_Login'))

}
const initialState = {
    userLogin: user,
    isProcessingLoggin: false,
    isLoggin: false,
    userHistory: undefined,
    isgettingHistory: false
   
}

export const {reducer: userManageReducer, actions: userManageAction} =createSlice({
    name: 'userManage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
        .addCase(userLoginAction.pending, (state,action) => {
            state.isProcessingLoggin = true
            state.isLoggin = false

        })
        .addCase(userLoginAction.fulfilled, (state,action) => {
            state.isProcessingLoggin = false
            state.userLogin = action.payload
            localStorage.setItem('User_Login', JSON.stringify(action.payload))
            state.isLoggin = true

        })
        .addCase(userLoginAction.rejected, (state,action) => {
            state.isProcessingLoggin = false
            state.userLogin = action.payload
            state.isLoggin = false
        })

        //lấy lịch sử người dùng 

        .addCase(getBookingHistory.pending, (state,action) => {
            state.isgettingHistory=true
        })
        .addCase(getBookingHistory.fulfilled, (state,action) => {
            state.isgettingHistory=false
            state.userHistory = action.payload
        })
        .addCase(getBookingHistory.rejected, (state,action) => {
            state.isgettingHistory=false
            state.userHistory = action.payload
        })

    }
})


export const userLoginAction = createAsyncThunk('/userManage/userLogin', async(userInfo, {dispatch,getState,rejectWithValue}) => {
    try {
        const result = await userManageService.getUserInfo(userInfo)
        if (result.data.statusCode === 200) {
            return result.data.content         
        }
              
    } catch (error) {
        return rejectWithValue(error)
        
    }

})

export const getBookingHistory = createAsyncThunk('userMange/bookingHistory', async (_,{dispatch, getState,rejectWithValue}) => {
    try {
        const result = await userManageService.getBookingHistory()
        // console.log('A',result.data.content)

        return result.data.content
        
    } catch (error) {
        return rejectWithValue(error)
        
    }
})

export const signUpAction = createAsyncThunk('userManage/signup', async(clientInfo, {dispatch,getState,rejectWithValue}) => {
    try {
        const result = await userManageService.signUp(clientInfo)

        return result.data.content
        
    } catch (error) {
        return rejectWithValue(error)
        
    }
})


