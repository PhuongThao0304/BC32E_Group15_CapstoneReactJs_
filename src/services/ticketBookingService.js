import { api } from "../constants/api"


export const ticketBookingService = {
    getTicketRoomDetail: (MaLichChieu) => {
        return api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${MaLichChieu}`)
    },
    bookingTicket: (bookedTikcetInfo) => { //{
        //     "maLichChieu": 0,
        //     "danhSachVe": [
        //       {
        //         "maGhe": 0,
        //         "giaVe": 0
        //       }
        //     ]
        //   }
        return api.post('QuanLyDatVe/DatVe', bookedTikcetInfo)

    },

    //Tạo lịch chiếu cho phim
    postFilmShowtimes: (filmInfo) => {
        return api.post('QuanLyDatVe/TaoLichChieu', filmInfo)
    }

}