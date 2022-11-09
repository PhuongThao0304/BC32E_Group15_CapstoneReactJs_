import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Cascader } from "antd";
import styled from "styled-components";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { cinemaManageServices } from "../../../../services/cinemaManageServices";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { ticketBookingService } from "../../../../services/ticketBookingService";

const Showtimes = () => {
    const param = useParams();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            maPhim: param.movieId,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: "",
        },

        onSubmit: 
        async (values) => {
            console.log("values", values);
            try {
                /*const result = await ticketBookingService.postFilmShowtimes(values);
                alert(result.data.content);*/
                navigate('/admin/films')
            } catch (errors) {
                console.log("errors", errors.response?.data);
            }
        },
    });

    const [state, setState] = useState({
        cinemaSystem: [],
        branch: [],
    });
    console.log("cinemaSystem", state.cinemaSystem);

    useEffect(() => {
       async function getCinemaInfo(){
        try {
            let result = await cinemaManageServices.getCinemaSystemInfo();
            setState({
                ...state,
                cinemaSystem: result.data.content,
            });
        } catch (errors) { }
       }
       getCinemaInfo();
    }, []);

    const handleChangeCinemaSystem = async (value) => {
        console.log("maHeThongRap", value);

        try {
            let result = await cinemaManageServices.getBranchInfo(value);
            setState({
                ...state,
                branch: result.data.content,
            });
        } catch (errors) {
            console.log("errors", errors.response?.data);
        }
    };

    const handleChangeBranch = (value) => {
        formik.setFieldValue("maRap", value);
    };

    const onOk = (values) => {
        formik.setFieldValue(
            "ngayChieuGioChieu",
            moment(values).format("DD/MM/YYYY hh:mm:ss")
        );
        console.log("onOkValues", moment(values).format("DD/MM/YYYY hh:mm:ss"));
    };

    const onChangeDate = (values) => {
        formik.setFieldValue(
            "ngayChieuGioChieu",
            moment(values).format("DD/MM/YYYY hh:mm:ss")
        );
        console.log(
            "onChangeDateValues",
            moment(values).format("DD/MM/YYYY hh:mm:ss")
        );
    };

    const onChangeInputNumber = (values) => {
        formik.setFieldValue("giaVe", values);
    };

    let film = {};
    if (localStorage.getItem("filmParam")) {
        film = JSON.parse(localStorage.getItem("filmParam"));
    }

    return (
        <Container className="Showtimes">
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onSubmitCapture={formik.handleSubmit}
            >
                <div className="mt-10 mb-30">
                    <span className="title text-40 text-white font-semibold">
                        Create Show times -{" "}
                    </span>
                    <span className="movieName">{param.movieName}</span>
                </div>
                <div className="main-content flex ">
                    <div className="movie_Img w-full lg:w-1/3 flex justify-center">
                        <img
                            src={film.hinhAnh}
                            alt={film.tenPhim}
                            width={200}
                            height={400}
                        />
                    </div>
                    <div className="createShowtimes w-full p-6 lg:w-2/3">
                        <Form.Item label="Cinema System">
                            <Select
                                options={state.cinemaSystem?.map((cinemaSystem, index) => ({
                                    label: cinemaSystem.tenHeThongRap,
                                    value: cinemaSystem.tenHeThongRap,
                                }))}
                                onChange={handleChangeCinemaSystem}
                                placeholder="Chon he thong rap"
                            />
                        </Form.Item>
                        <Form.Item label="Branch">
                            <Select
                                options={state.branch?.map((branch, index) => ({
                                    label: branch.tenCumRap,
                                    value: branch.maCumRap,
                                }))}
                                onChange={handleChangeBranch}
                                placeholder="Chon cum rap"
                            />
                        </Form.Item>
                        <Form.Item label="Show times">
                            <DatePicker showTime onChange={onChangeDate} onOk={onOk} />
                        </Form.Item>
                        <Form.Item label="Ticket Price">
                            <InputNumber
                                min={75000}
                                max={150000}
                                onChange={onChangeInputNumber}
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button htmlType="submit" className="btn_submit">
                                Create
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Container>
    );
};

export default Showtimes;

const Container = styled.div`
  &.Showtimes {
    .movieName {
      font-size: 40px;
      font-weight: 700;
      background: -webkit-linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .createShowtimes {
      padding-right: 200px;
      .ant-form-item {
        .ant-form-item-label {
          label {
            color: #fff;
            font-size: 19px;
          }
        }
        .ant-form-item-control {
          .ant-form-item-control-input-content {
            .ant-input {
              color: #5e5e5e;
            }
            .ant-picker-input {
              input {
                color: #5e5e5e;
              }
            }
            .ant-input-number-input-wrap {
              input {
                color: #5e5e5e;
              }
            }
          }
        }
        .btn_submit {
          background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
          color: #fff;
          font-weight: 600;
          font-size: 12px;
          height: 40px;
          width: 100px;
          border-radius: 4px;
          border: transparent;
          box-shadow: 0 0 20px 0 rgb(255 88 96 / 50%);
          opacity: 0.85;
          transition: 0.4s ease;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
`;
