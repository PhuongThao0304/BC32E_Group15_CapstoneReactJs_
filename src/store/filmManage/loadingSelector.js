import { useSelector } from "react-redux";

export const useLoading = () => useSelector(state => state.loadingReducer)