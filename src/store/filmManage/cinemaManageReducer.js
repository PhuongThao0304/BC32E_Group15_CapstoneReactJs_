import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cinemaManageServices } from '../../services/cinemaManageServices'

const initialState = {
    cinemaInfo: [],
    isFetchingCinema: false,
    error: undefined,
}

export const { reducer: cinemaManageReducer, actions: cinemaManageAction } = createSlice({
    name: 'cinemaManage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCinemaInfo.pending, (state, action) => {
                state.isFetchingCinema = true
            })
            .addCase(getCinemaInfo.fulfilled, (state, action) => {
                state.cinemaInfo = action.payload
                state.isFetchingCinema = false
            })
            .addCase(getCinemaInfo.rejected, (state, action) => {
                state.error = action.payload
                state.isFetchingCinema = false
            })
    }

})

export const getCinemaInfo = createAsyncThunk(
    'cinemaManage/getCinemaInfo',
    async (data, { dispatch, getState, rejectWithValue }) => {
        try {
            const result = await cinemaManageServices.getCinemaInfo()
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)