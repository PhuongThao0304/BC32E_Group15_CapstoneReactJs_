import { api } from "../constants/api"


export const userManageService = {
    getUserInfo: (loginInfo) => {
        return api.post('QuanLyNguoiDung/DangNhap',loginInfo)
    }, 
    getBookingHistory: () => {
        return api.post('QuanLyNguoiDung/ThongTinTaiKhoan')
    },
    signUp: (clientInfo) => {
        return api.post('QuanLyNguoiDung/DangKy',clientInfo)
    }
}