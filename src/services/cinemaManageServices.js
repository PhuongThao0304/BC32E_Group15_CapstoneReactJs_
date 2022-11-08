import { api, GROUPID } from "../constants/api"

export const cinemaManageServices = {
    getCinemaInfo: () => {
        return api.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    },
    getCinemaSystemInfo: () => {
        return api.get(`QuanLyRap/LayThongTinHeThongRap?maNhom=${GROUPID}`)
    },
    getBranchInfo: (maHeThongRap) => {
        return api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}
