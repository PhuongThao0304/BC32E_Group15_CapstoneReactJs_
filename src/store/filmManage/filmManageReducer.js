import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { filmManageServices } from '../../services/filmManageServices'

const initialState = {
    movieList: [],
    isFetching: false,
    error: undefined,
    isFetchingMD: false,
    movieDetail: undefined,
    isLoading: false,
    errorMessage: null,
    filmInfo: {},
    isFetchingFilmInfo: false,
    isLoadingFilmChanged: false,
    isFetchingDeleteFilm: false,
}

export const { reducer: filmManageReducer, actions: filmManageAction } = createSlice({
    name: 'filmManage',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //getmovielist
            .addCase(getMovieList.pending, (state, action) => {
                state.isFetching = true
            })
            .addCase(getMovieList.fulfilled, (state, action) => {
                state.movieList = action.payload
                state.isFetching = false
            })
            .addCase(getMovieList.rejected, (state, action) => {
                state.error = action.payload
                state.isFetching = false
            })
            //getmoviedetail
            .addCase(getMovieDetail.pending, (state, action) => {
                state.isFetchingMD = true
            })
            .addCase(getMovieDetail.fulfilled, (state, action) => {
                state.isFetchingMD = false
                state.movieDetail = action.payload

            })
            .addCase(getMovieDetail.rejected, (state, action) => {
                state.isFetchingMD = false
                state.error = action.payload

            })
            //POST movie
            .addCase(postMovie.pending, (state, action) => {
                state.isLoading = true
                state.errorMessage = null
            })
            .addCase(postMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.errorMessage = action.payload
            })
            .addCase(postMovie.rejected, (state, action) => {
                state.isLoading = false
                state.errorMessage = action.payload.message
            })
            //Get filmInfo
            .addCase(getFilmInfo.pending, (state, action) => {
                state.isFetchingFilmInfo = true
            })
            .addCase(getFilmInfo.fulfilled, (state, action) => {
                state.isFetchingFilmInfo = false
                state.filmInfo = action.payload
            })
            .addCase(getFilmInfo.rejected, (state, action) => {
                state.isFetchingFilmInfo = false
                state.error = action.payload
            })
            //POST filmInfoChanged
            .addCase(postFilmInfoChanged.pending, (state, action) => {
                state.isLoadingFilmChanged = true
                state.errorMessage = null
            })
            .addCase(postFilmInfoChanged.fulfilled, (state, action) => {
                state.isLoadingFilmChanged = false
                state.errorMessage = action.payload
            })
            .addCase(postFilmInfoChanged.rejected, (state, action) => {
                state.isLoadingFilmChanged = false
                state.errorMessage = action.payload.message
            })
            //delete film
            .addCase(deleteFilm.pending, (state, action) => {
                state.isFetchingDeleteFilm = true
            })
            .addCase(deleteFilm.fulfilled, (state, action) => {
                state.isFetchingDeleteFilm = false
                // state.movieDetail = action.payload

            })
            .addCase(deleteFilm.rejected, (state, action) => {
                state.isFetchingDeleteFilm = false
                state.error = action.payload
            })
    }
})

export const getMovieList = createAsyncThunk(
    'filmManage/getMovieList',
    async (tenPhim = "", { dispatch, getState, rejectWithValue }) => {
        try {
            const result = await filmManageServices.getMovieList(tenPhim)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getMovieDetail = createAsyncThunk(
    'filmMange/getMovieDetail',
    async (movieId, { dispatch, getState, rejectWithValue }) => {
        try {
            const result = await filmManageServices.getMovieDetail(movieId)
            return result.data.content
            

        } catch (error) {
            return rejectWithValue(error.response.data)

        }

    })

export const postMovie = createAsyncThunk(
    'filmManage/postMovie',

    async (formData, { dispatch, getState, rejectWithValue }) => {
        try {
            const result = await filmManageServices.postMovie(formData)
            // console.log('result', result.data.content)
            if (result.data.statusCode === 200) {
                return result.data.content
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getFilmInfo = createAsyncThunk(
    'filmManage/getFilmInfo',
    async (movieId, { dispatch, getState, rejectWithValue }) => {
        try {
            const result = await filmManageServices.getFilmInfo(movieId)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const postFilmInfoChanged = createAsyncThunk(
    'filmManage/postFilmInfoChanged',
    async (formData, { dispatch, getState, rejectWithValue }) => {
        try {
            const result = await filmManageServices.postFilmInfoChanged(formData)
            if (result.data.statusCode === 200) {
                return result.data.content
            }
            dispatch(getFilmInfo())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteFilm = createAsyncThunk(
    'filmManage/deleteFilm',
    async (movieId, { dispatch, getState, rejectWithValue }) => {
        try {
            const result = await filmManageServices.deleteFilm(movieId)
            if (result.data.statusCode === 200) {
                return result.data.content
            }
            dispatch(getFilmInfo())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)