import { useSelector } from "react-redux";

export const useCinemaManage = () => useSelector((state) => state.cinemaManageReducer)