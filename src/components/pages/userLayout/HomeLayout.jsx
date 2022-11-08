import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import img from "../../../assets/images/Banner/movieBanner.jpg";
import { getMovieList } from "../../../store/filmManage/filmManageReducer";
import { useFilmManage } from "../../../store/filmManage/filmManageSelector";
import { useQueryUrl } from "../../hooks/useQueryUrl";
import cn from "classnames";
import { useCinemaManage } from "../../../store/filmManage/cinemaManageSelector";
import { getCinemaInfo } from "../../../store/filmManage/cinemaManageReducer";
import { Tabs, TabPane, Radio, Space } from "antd";
import moment from "moment";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams({
    isShowing: true,
    isHot: true,
  });
  const [query, setQueryUrl] = useQueryUrl({
    isShowing: true,
    isHot: true,
  });
  const v = useQueryUrl();

  const navigate = useNavigate();

  const { movieList, isFetching, error } = useFilmManage();
  // console.log('isFetching movieList', isFetching);
  // console.log('movieList', movieList)
  useEffect(() => {
    dispatch(getMovieList());
  }, []);

  //getCinemaInfo
  const { cinemaInfo, isFetchingCinema } = useCinemaManage();
  // console.log("cinemaInfo", cinemaInfo);
  // console.log("isFetchingCinema", isFetchingCinema);
  useEffect(() => {
    dispatch(getCinemaInfo());
  }, []);

  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  const renderHeThongRap = () => {
    return cinemaInfo?.map((heThongRap, index) => {
      return (
        <Tabs.TabPane
          tab={
            <img
              src={heThongRap.logo}
              className="rounded-full ring ring-white ring-offset-white ring-offset-2 hover:ring-yellow-500 hover:ring-offset-yellow-500 active:ring-yellow-400 active:ring-offset-yellow-400"
              width="50px"
              height="50px"
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.slice(0, 5).map((cumRap, index) => {
              return (
                <Tabs.TabPane
                  tab={
                    <div className="text-left" style={{ width: "350px" }}>
                      <img
                        src={cumRap.hinhAnh}
                        width="150px"
                        height="150px"
                        onError={(e) => { e.target.onError = null; e.target.src = "https://picsum.photos/75/75" }}
                      />
                      <p className="font-semibold my-12 text-18 hover:text-yellow-200" style={{ color: "#fad961" }}>
                        {cumRap.tenCumRap}
                      </p>
                      <p className="text-white mb-26">{cumRap.diaChi}</p>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.map((film, index) => {
                    return (
                      <div
                        className="flex flex-row justify-start border-b-2 mb-30 pb-30"
                        style={{ borderColor: "#5b5b5b" }}
                        key={index}
                      >
                        <div className="w-1/4">
                          <img
                            src={film.hinhAnh}
                            width="150px"
                            height="250px"
                            alt={film.tenPhim}
                            onError={(e) => { e.target.onError = null; e.target.src = "https://picsum.photos/150/200" }}
                          />
                        </div>
                        <div className="w-3/4">
                          <p
                            className="font-bold text-34 mb-16 leading-tight tracking-tight cursor-pointer"
                            style={{ color: "#fad961" }}
                          >
                            {film.tenPhim}
                          </p>
                          <div className="grid grid-cols-5 gap-3">
                            {film.lstLichChieuTheoPhim
                              ?.slice(0, 12)
                              .map((lichChieu, index) => {
                                return (
                                  <NavLink
                                    to="/"
                                    key={index}
                                    className="text-white text-18 hover:text-yellow-300"
                                  >
                                    {moment(lichChieu.ngayChieuGioChieu).format(
                                      "hh:mm A"
                                    )}
                                  </NavLink>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Tabs.TabPane>
      );
    });
  };

  return (
    <Container className="HomeLayout">
      <div className="carousel mb-80">
        <div className="overlay"></div>
      </div>
      <div className="container">
        <div className="movie_list mb-80">
          <div className="btn-movieList mb-30">
            <Button
              className={cn({
                active: searchParam.get("isShowing") === "true",
              })}
              onClick={() => {
                setQueryUrl({
                  isShowing: true,
                });
              }}
            >
              Now Showing
            </Button>
            <Button
              className={cn("ms-3", {
                active: searchParam.get("isShowing") === "false",
              })}
              onClick={() => {
                setQueryUrl({
                  isShowing: false,
                });
              }}
            >
              Coming Soon
            </Button>
          </div>
          <section className="movie_list_content mb-100">
            <div className="container mx-auto">
              <div className="flex flex-wrap -m-4">
                {movieList
                  .filter(
                    (item) => item.sapChieu?.toString() === query.isShowing
                  )
                  .map((film) => (
                    <div
                      key={film.maPhim}
                      className="lg:w-1/4 md:w-1/2 p-7 w-full mb-16"
                    >
                      <div className="relative h-400 rounded overflow-hidden">
                        <img
                          style={{ cursor: "pointer" }}
                          alt={film.tenPhim}
                          className="object-cover object-center w-full h-full block"
                          src={film.hinhAnh}
                          onClick={() => {
                            navigate(`/details/${film.maPhim}`);
                          }}
                        />
                      </div>
                      <div className="mt-4">
                        <H3
                          style={{ cursor: "pointer" }}
                          className=" filmName text-white text-20 font-semibold mb-1"
                          onClick={() => {
                            navigate(`/details/${film.maPhim}`);
                          }}
                        >
                          {film.tenPhim}
                        </H3>
                        <span className="mt-1 fa-solid fa-star rating_icon"></span>
                        <span className="ml-5 font-medium text-18 rating_point">
                          ({film.danhGia}/10)
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>

        <div id="showtimes" className="movie-schedule mb-80">
          <div className="container mx-auto">
            <p className="title leading-none cursor-pointer sm:text-30">SHOWTIMES</p>
            <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
          </div>


        </div>
      </div>
    </Container>
  );
};

export default HomeLayout;

const Container = styled.div`
  &.HomeLayout {
    .carousel {
      /* width: 100%; */
      height: 750px;
      background-image: url(${img});
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: top;
      position: relative;
      /* top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1; */
      .overlay {
        background: rgba(39, 43, 54, 0.112);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .container {
      max-width: 1280px;
      padding: 0 15px;
      margin: auto;
      box-sizing: border-box;
      .rating_icon {
        background: -webkit-linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .rating_point {
        background: -webkit-linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .movie-card {
        h3 {
          color: #f76b1c;
        }
      }
      .movie-schedule {
        border-color: rgba(255, 255, 255, 0.75);
        .title{
          font-size: 45px;
          font-weight: 700;
          background: -webkit-linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        }
      }
    }
    
  }`;

const Button = styled.button`
  background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  height: 50px;
  width: 150px;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgb(255 88 96 / 50%);
  opacity: 0.45;
  margin-right: 20px;
  transition: 0.4s ease;
  &:hover {
    opacity: 0.85;
  }
  &.active {
    background-image: linear-gradient(90deg, #ffc800 0%, #ff5e00 100%);
    color: #fff;
    opacity: 1;
  }
`;

const H3 = styled.h3`
  &.filmName {
    &:hover {
      background: -webkit-linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
