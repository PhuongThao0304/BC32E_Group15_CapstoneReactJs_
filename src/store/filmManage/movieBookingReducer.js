import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ticketBookingService } from "../../services/ticketBookingService"
import { loadingAction } from "./loadingReducer"



const initialState = {
    ticketInfo: [],
    isFetching: false,
    danhSachGheDangDat: [],
    isBooking: false,
    tabActive: '1', 
}

export const {reducer: movieBookingReducer, actions: movieBookingAction} = createSlice({
    name: 'movieBooking',
    initialState,
    reducers: {
        //CHỌN VÉ
        selectingTicket: (state,action) => {
            let index = state.danhSachGheDangDat.findIndex((item) => item.maGhe === action.payload.maGhe)
            if (index !== -1) {
                state.danhSachGheDangDat.splice(index,1)
            }
            else 
            state.danhSachGheDangDat.push(action.payload)
        },
        completeBooking: (state,action) => {
            state.danhSachGheDangDat = []
        },
        tab2Switching: (state,action) => {
            state.tabActive = '2'
        },
        tabSwitching: (state,action) => {
            state.tabActive = action.payload
        }


    },
    extraReducers: (builder) => {
        builder
        .addCase(getTicketRoomDetail.pending, (state,action) => {
            state.isFetching = true
           
        })
        .addCase(getTicketRoomDetail.fulfilled, (state,action) => {
            state.isFetching = false
            state.ticketInfo = action.payload
        })
        .addCase(getTicketRoomDetail.rejected, (state,action) => {
            state.isFetching = false
            state.ticketInfo = action.payload
        })

        .addCase(bookingTicket.pending, (state,action) => {
            state.isBooking = true
        })
        .addCase(bookingTicket.fulfilled, (state,action) => {
            state.isBooking = false
            // state.danhSachGheDangDat = []
            // state.tabActive = '2'
        })
    
        .addCase(bookingTicket.rejected, (state,action) => {
            state.isBooking = false
        })
    
    

    }
} )


export const getTicketRoomDetail = createAsyncThunk('movieBooking/getTicketRoomDetail', async(maLichChieu, {dispatch,getState,rejectWithValue}) => {

try {
    const result = await ticketBookingService.getTicketRoomDetail(maLichChieu)

    return result.data.content
    
} catch (error) {
    return rejectWithValue(error.data.response) 
}

})

export const bookingTicket = createAsyncThunk('movieBooking/bookingTicket', async(bookedTikcetInfo, {dispatch,getState,rejectWithValue}) => {

    try {
        //gọi loading để hiện lên 
        dispatch(loadingAction.displayLoading())
        
        const result = await ticketBookingService.bookingTicket(bookedTikcetInfo)
        //bất đôngf bộ nên await thêm cái nữa
       await dispatch(getTicketRoomDetail(bookedTikcetInfo.maLichChieu))
     dispatch(movieBookingAction.completeBooking())
        dispatch(loadingAction.hideLoading())
        dispatch(movieBookingAction.tab2Switching())
       
        return result.data.content
        
        
    } catch (error) {
        dispatch(loadingAction.hideLoading())
        return rejectWithValue(error.data.response)
        
    }

})


