import { useSelector } from "react-redux";

export const useFilmManage = () => useSelector((state) => state.filmManageReducer)