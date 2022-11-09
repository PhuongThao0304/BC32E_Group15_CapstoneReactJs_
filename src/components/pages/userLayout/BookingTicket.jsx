import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, redirect, useActionData, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { bookingTicket, getBookingHistory, getTicketRoomDetail, movieBookingAction, useFilmManage, useUserManage } from "../../../store/filmManage";
import { useMovieBooking } from "../../../store/filmManage/movieBookingSelector";
import { CloseCircleOutlined, CloseSquareOutlined,HomeOutlined  } from '@ant-design/icons';
import _, { sortBy, first } from "lodash";
import { Tabs } from 'antd'
import moment from "moment";


const BookingTicket = () => {

  console.log(JSON.parse(localStorage.getItem('User_Login')))
  const dispatch = useDispatch()



  const paramLichChieu = useParams()
  console.log(paramLichChieu.maLichChieu)
  const { ticketInfo, danhSachGheDangDat } = useMovieBooking()
  const { userLogin } = useUserManage()
  console.log(userLogin)
  console.log('ticketInfo', ticketInfo)
  console.log('danhSachGheDangDat', danhSachGheDangDat)


  useEffect(() => {
    dispatch(getTicketRoomDetail(paramLichChieu.maLichChieu))
  }, [])

  const { thongTinPhim, danhSachGhe } = ticketInfo
  console.log(thongTinPhim)




  if (!localStorage.getItem('User_Login')) {
    return <Navigate to='/login' />
  }


  const renderGhe = () => {
    return danhSachGhe?.map((item, index) => {
      let classGheDaDat = item.daDat ? 'gheDaDat' : ''
      let classGheDangDat = ''
      let classGheUserDaDat = ''
      let indexGheDangDat = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === item.maGhe)

      if (indexGheDangDat !== -1) {
        classGheDangDat = 'gheDangDat'
      }
      else {
        classGheDangDat = ''
      }

      if (userLogin.taiKhoan === item.taiKhoanNguoiDat) {
        classGheUserDaDat = 'gheUserDat'
      }


      return (
        <> {item.loaiGhe === 'Vip' ? <button onClick={() => { dispatch(movieBookingAction.selectingTicket(item)) }} disabled={item.daDat} className={`ghe m-1 gheVip ${classGheDaDat} ${classGheDangDat} ${classGheUserDaDat}`} key={index}
        > {item.daDat ? <CloseSquareOutlined /> : item.stt} </button> : <button onClick={() => { dispatch(movieBookingAction.selectingTicket(item)) }} disabled={item.daDat} className={`ghe m-1 ${classGheDaDat} ${classGheDangDat} ${classGheUserDaDat}`} key={index}
        >{item.daDat ? <CloseSquareOutlined /> : item.stt}</button>}
          {(index + 1) % 16 === 0 ? <br /> : ''}
        </>

      )

    })
  }


  return <Container className="bookingPage">
    <div className="container">
      <div>

        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <h1 className="text-orange-400 text-4xl text-center">ĐẶT VÉ</h1>
            <div className="flex flex-row items-center align-middle">
              <div className="screen ">
                <h3 className="text-black my-auto text-center items-center mt-3 ">MÀN HÌNH</h3>  </div>
            </div>
            <div className="ml-[35px] mt-[25px]">
              {renderGhe()}
            </div>
            <div className=" mt-5 flex justify-center">
              <table className="divide-y divide-gray-200 w-2/3">
                <thead>
                  <tr>
                    <th>Ghế chưa đặt</th>
                    <th>Ghế đang đặt</th>
                    <th>Ghế VIP</th>
                    <th>Ghế đã được đặt</th>
                  </tr>
                </thead>
                <tbody className=" opacity ivide-y divide-gray-200">
                  <tr>
                    <td> <div className="ghe"></div></td>
                    <td> <div className="ghe gheDangDat"></div></td>
                    <td> <div className="ghe gheVip"></div></td>
                    <td> <div className="ghe gheDaDat"></div></td>
                  </tr>
                </tbody>

              </table>
            </div>


          </div>

          <div className=" pl-[40px] col-span-4">

            <h3 className="text-center text-green-500 text-3xl"> <span className="text-orange-500">Tổng tiền: </span>
              {danhSachGheDangDat.reduce((tongTien, item, index) => {
                return tongTien + item.giaVe
              }, 0).toLocaleString()}
            </h3>
            <hr />
            <h3 className="text-xl text-orange-400">{thongTinPhim?.tenPhim}</h3>
            <p>Địa điểm: {thongTinPhim?.diaChi}</p>
            <p>Ngày: {thongTinPhim?.ngayChieu}. Suất chiếu: {thongTinPhim?.gioChieu}</p>
            <hr />
            <div className="flex flex-row ">
              <div className="w-4/5"> <span className="text-orange-400 text-lg text-left">Ghế đã chọn: {sortBy(danhSachGheDangDat.map(item => ({ ...item, stt: Number(item.stt) })), ['stt']).map((gheDD, index) => {
                return (
                  <span className="text-xl text-green-500" key={index}> <span> </span>{gheDD.stt}</span>
                )
              })} <span> </span> </span></div>
              <div className="text-right text-red-500">
                {danhSachGheDangDat.reduce((tongTien, item, index) => {
                  return tongTien + item.giaVe
                }, 0).toLocaleString()}
              </div>

            </div>
            <div>
              <i>Email: </i> {userLogin.email}
            </div>
            <div>
              <i>Số điện thoại: </i> {userLogin.soDT}
            </div>
            <div className="row mt-3 cursor-pointer">
              <Button onClick={() => {
                let bookedTikcetInfo = {
                  "maLichChieu": 0,
                  "danhSachVe": [
                    {
                      "maGhe": 0,
                      "giaVe": 0
                    }
                  ]
                }
                bookedTikcetInfo.maLichChieu = paramLichChieu.maLichChieu;
                bookedTikcetInfo.danhSachVe = danhSachGheDangDat
                dispatch(bookingTicket(bookedTikcetInfo))

              }}>Đặt vé</Button>
            </div>



          </div>
        </div>



      </div>
      <div></div>
    </div>


  </Container>;
};


const App = () => {
  const { tabActive } = useMovieBooking()
  console.log('tabActive', tabActive)
  const dispatch = useDispatch()

  return (
    <Container className=" TabPage ant-tabs tab p-5 text-white ">
      <div className="container">
        <Tabs defaultActiveKey={tabActive} activeKey={tabActive} onTabClick={(key, event) => dispatch(movieBookingAction.tabSwitching(key))} >
          <Tabs.TabPane tab="01. CHỌN GHẾ & THANH TOÁN" key="1">

            <BookingTicket />
          </Tabs.TabPane>
          <Tabs.TabPane tab="02. KẾT QUẢ ĐẶT VÉ" key="2">
            <KetQuaDatVe />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<NavLink to="/home"><HomeOutlined style={{font: 
        '25px'}}/></NavLink>} key="3">
            
          </Tabs.TabPane>
        </Tabs>

      </div>
    </Container>


  )
};

const KetQuaDatVe = () => {
  const dispatch = useDispatch()
  const { userHistory } = useUserManage()
  console.log(userHistory)

  useEffect(() => {
    dispatch(getBookingHistory())
  }, [])
  return (
    <div className="p5">

      <section className="text-white body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-orange-400">Lịch sử đặt vé</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Thông tin vé đã đặt</p>
          </div>
          <div className="flex flex-wrap -m-2">

            {userHistory?.thongTinDatVe.map((item, index) => {
              const seatList = first(item.danhSachGhe)
              return (
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-[50px] h-[50px] bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.hinhAnh} />
                    <div className="flex-grow">
                      <h2 className="text-orange-400 title-font font-medium">{item.tenPhim}</h2>
                      <p className="text-white mb-0">Ngày chiếu: {moment(item.ngayDat).format('dd-mm-yyyy')} - Giờ chiếu: {moment(item.ngayDat).format('hh:mm:ss')}</p>
                      <p className="mb-0">Địa điểm: <br /> - {seatList.tenHeThongRap}  </p>
                      <p className="mb-0">- {seatList.tenCumRap} - Ghế: {item.danhSachGhe.map((ghe, index) => {
                        return <span key={index}> {ghe.tenGhe}</span>

                      })}</p>
                    </div>
                  </div>
                </div>
              )

            })}



          </div>
        </div>
      </section>

    </div>
  )

}

export default App;

const Container = styled.div`
&.bookingPage {
  .container {
    max-width: 1280px;
      padding: 15px;
      margin: auto;


.screen {
  border-bottom: 50px solid #ffffff;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  height: 0;
  width: 100%;
  filter: drop-shadow(0 0 40px #ffffff);
  justify-content: center;
}
.ghe { //normal status
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  background-color: grey;
  color: #ffffff;
}
.gheDaDat {
  
  cursor: no-drop;
  background-color: red;
  
}

.gheDangDat {
  background-color: #0ccf40!important;
}
.gheVip {
  background-color: #f76b1c;
}
.gheUserDat {
  background-color: yellow!important;;
  color: #000000;


}



  }
 

}

&.TabPage {

  .ant-tabs {
        color: white !important;
    }

    .container {
    max-width: 1280px;
      padding: 15px;
      margin: auto;

}
}
`

const Button = styled.button`
  background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  height: 50px;
  width: 130px;
  margin-right: 15px;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgb(255 88 96 / 50%);
  opacity: 0.85;
  transition: 0.4s ease;
  &:hover {
    opacity: 1;
  }
  margin: auto;
`;


