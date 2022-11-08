import { useSelector } from "react-redux";

export const useMovieBooking = () => useSelector(state => state.movieBookingReducer)
