import React, { Fragment } from "react";
import { Table } from "antd";
import { AudioOutlined, EditFilled, DeleteFilled, CalendarOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import styled from "styled-components";
import { useFilmManage } from "../../../../store/filmManage/filmManageSelector";
import { useEffect } from "react";
import { deleteFilm, getMovieList } from "../../../../store/filmManage/filmManageReducer";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Films = () => {
    //getMovieList
    const dispatch = useDispatch();
    const {
        movieList,
        movieList: { maPhim },
    } = useFilmManage();
    useEffect(() => {
        dispatch(getMovieList());
    }, []);
    // console.log("movieList", movieList);

    const columns = [
        {
            title: "ID",
            dataIndex: "maPhim",
            render: (text, object) => {
                return <span>{text}</span>;
            },
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ["ascend", "descend"],
            width: "10%",
        },
        {
            title: "Image",
            dataIndex: "hinhAnh",
            render: (text, film) => {
                return (
                    <img
                        className="object-cover w-60 h-90"
                        src={film.hinhAnh}
                        alt={film.tenPhim}
                        onError={(e) => {
                            e.target.onError = null;
                            e.target.src = "https://picsum.photos/50/50";
                        }}
                    />
                );
            },
            width: "15%",
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.hinhAnh - b.hinhAnh,
        },
        {
            title: "Name",
            dataIndex: "tenPhim",
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            width: "20%",
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Description",
            dataIndex: "moTa",
            sorter: (a, b) => {
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if (moTaA > moTaB) {
                    return 1;
                }
                return -1;
            },
            render: (text, film) => {
                return (
                    <Fragment>
                        {film.moTa.length > 50
                            ? film.moTa.substr(0, 50) + "......."
                            : film.moTa}
                    </Fragment>
                );
            },
            width: "35%",
        },
        {
            title: "Actions",
            dataIndex: "hanhDong",
            render: (text, film) => {
                return (
                    <div className="flex justify-start align-items-center">
                        <div className="mr-10">
                            <NavLink
                                key={1}
                                className=" text-yellow-400 text-30 p-2 hover:text-orange-600"
                                to={`/admin/films/edit/${film.maPhim}`}
                            >
                                <EditFilled />
                            </NavLink>
                        </div>
                        <div className="mr-10">
                            <span
                                key={2}
                                style={{ cursor: "pointer" }}
                                className=" text-orange-600 text-30 p-2 hover:text-orange-200"
                                onClick={() => {
                                    if (window.confirm('Do you want to delete ' + film.tenPhim)) {
                                        //action
                                        dispatch(deleteFilm(film.maPhim))
                                    }
                                }}
                            >
                                <DeleteFilled />
                            </span>
                        </div>
                        <div className="mr-10">
                            <NavLink
                                key={1}
                                className=" text-green-400 text-30 p-2 hover:text-green-600"
                                to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`}
                                onClick={() => { localStorage.setItem('filmParam', JSON.stringify(film)) }}
                            >
                                <CalendarOutlined />
                            </NavLink>
                        </div>
                    </div>
                );
            },
            width: "30%",
        },
    ];
    const data = movieList;

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    const { Search } = Input;

    const onSearch = (value) => {
        console.log(value)
        //
        dispatch(getMovieList(value))
    };

    return (
        <Container className="admin_films pt-20">
            <p className="title leading-none cursor-pointer font-semibold sm:text-30">
                Films Management
            </p>
            <Button>
                <Link to="/admin/films/addnew" className="text-white hover:text-white">Add New</Link>
            </Button>
            <div className="input_search my-20">
                <Search
                    placeholder="Film name"
                    onSearch={onSearch}
                    enterButton

                />
            </div>
            <Table
                key={maPhim}
                columns={columns}
                dataSource={data}
                onChange={onChange}
                rowKey={"maPhim"}
            />
        </Container>
    );
};

export default Films;

const Container = styled.div`
  &.admin_films {
    .input_search {
        .ant-input-group > .ant-input:first-child, .ant-input-group-addon:first-child{
            border-color: #fad961;

            
        }
        .ant-input{
                padding: 8px 14px;
            }
      .ant-btn-primary {
        background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
        color: #fff;
        font-weight: 700;
        font-size: 16px;
        line-height: 10px;
        height: 40px;
        border-radius: 4px;
        border: none;
        box-shadow: 0 0 20px 0 rgb(255 88 96 / 50%);
        padding: 0 20px;
        opacity: 0.85;
        transition: 0.4s ease;
        &:hover {
          opacity: 1;
        }
      }
    }

    .ant-table-thead {
      .ant-table-column-title,
      .ant-table-cell {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .ant-table-tbody {
      .ant-table-cell {
        font-weight: 400;
        font-size: 16px;
      }
    }
  }
`;

const Button = styled.button`
  background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  height: 40px;
  width: 100px;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgb(255 88 96 / 50%);
  opacity: 0.85;
  transition: 0.4s ease;
  &:hover {
    opacity: 1;
    color: #fff;
  }
`;
