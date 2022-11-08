import { api, GROUPID } from "../constants/api"



export const filmManageServices = {
    getMovieList: (tenPhim = '') => {
        if (tenPhim.trim() !== '') {
            return api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    },

    getMovieDetail: (movieId) => {
        return api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`)
    },
    postMovie: (formData) => {
        return api.post(`QuanLyPhim/ThemPhimUploadHinh?maNhom=${GROUPID}`, formData)
    },
    getFilmInfo: (movieId) => {
        return api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`)
    },
    postFilmInfoChanged: (formData) => {
        return api.post('QuanLyPhim/CapNhatPhimUpload', formData)
    },
    deleteFilm: (movieId) => {
        return api.delete(`QuanLyPhim/XoaPhim?MaPhim=${movieId}`)
    }
}

