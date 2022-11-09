import React, { useState } from 'react'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import styled from 'styled-components';
import { useFormik } from 'formik';
import moment from "moment";
import FormList from 'antd/lib/form/FormList';
import { useDispatch } from 'react-redux';
import { getFilmInfo, postFilmInfoChanged, postMovie } from '../../../../store/filmManage/filmManageReducer';
import { useEffect } from 'react';
import { useFilmManage } from '../../../../store/filmManage/filmManageSelector';
import { GROUPID } from '../../../../constants/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditFilm = () => {
    const [componentSize, setComponentSize] = useState('default');

    const param = useParams()
    // console.log(param.movieId)
    const { filmInfo } = useFilmManage();
    // console.log('filmInfo', filmInfo)

    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFilmInfo(param.movieId))
    
    }, [])

    

    const navigate = useNavigate()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: filmInfo.maPhim,
            tenPhim: filmInfo?.tenPhim,
            trailer: filmInfo?.trailer,
            moTa: filmInfo?.moTa,
            ngayKhoiChieu: filmInfo.ngayKhoiChieu,
            dangChieu: filmInfo.dangChieu,
            sapChieu: filmInfo.sapChieu,
            hot: filmInfo.hot,
            // maNhom: GROUPID,
            danhGia: filmInfo.danhGia,
            hinhAnh: null,

        },
        onSubmit: (values) => {
            console.log('values', values)
            values.maNhom = GROUPID
            const formData = new FormData()
            // formData.append('tenPhim', formik.values.tenPhim)

            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            // console.log('formik', formData.get('moTa'))
            dispatch(postFilmInfoChanged(formData))

            alert('Updated Successfully!')
            navigate('/admin/films')



        }
    })

    const handleChangeDatePicker = (value) => {
        // console.log('datePickerChange', moment(value))
        let ngayKhoiChieu = moment(value)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image.gif') {
            await formik.setFieldValue('hinhAnh', file)
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                // console.log(e.target.result)
                setImgSrc(e.target.result)
            }
        }
    }


    return (
        <Container className='EditFilm'>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                size="large"
            >
                <h2 className="title leading-none cursor-pointer font-semibold text-white sm:text-30 mt-20 mb-30">Edit Film</h2>
                <Form.Item label="Movie Name">
                    <Input name="tenPhim" placeholder='Movie name' onChange={formik.handleChange}
                        value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" placeholder='Trailer' onChange={formik.handleChange}
                        value={formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input name="moTa" placeholder='Description' onChange={formik.handleChange}
                        value={formik.values.moTa} />
                </Form.Item>
                <Form.Item label="Show time">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker}
                        value={moment(formik.values.ngayKhoiChieu)} />
                    {/* value={moment(formik.values.ngayKhoiChieu, "DD/MM/YYYY")} */}
                </Form.Item>
                <Form.Item label="Now Showing" valuePropName="checked">
                    <Switch name="dangChieu" onChange={handleChangeSwitch('dangChieu')}
                        checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Coming Soon" valuePropName="checked">
                    <Switch name="sapChieu" onChange={handleChangeSwitch('sapChieu')}
                        checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={handleChangeSwitch('hot')}
                        checked={formik.values.hot} />
                </Form.Item>
                <Form.Item label="Rating">
                    <InputNumber placeholder='10' onChange={handleChangeInputNumber('danhGia')} min={1} max={10}
                        value={formik.values.danhGia} />
                </Form.Item>
                <Form.Item label="Image">
                    <input type="file" onChange={handleChangeFile} accept="image/png,image/jpeg,image/jpg,image/gif" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? filmInfo.hinhAnh : imgSrc} alt='...' />
                </Form.Item>
                <Form.Item label="Button">
                    <button type="submit" className='bg-blue-500 text-white p-2 btn_submit'>Edit film</button>
                </Form.Item>
            </Form>
        </Container>
    )
}

export default EditFilm

const Container = styled.div`
    &.EditFilm{
        .ant-form-item{
            .ant-form-item-label{
                label{
                    color: #fff;
                    font-size: 19px;
                }
            }
            .ant-form-item-control{
                .ant-form-item-control-input-content{
                    .ant-input{
                        color: #5e5e5e;
                    }
                    .ant-picker-input{
                        input{
                            color: #5e5e5e;
                        }
                    }
                    .ant-input-number-input-wrap{
                        input{
                            color: #5e5e5e;
                        }
                    }
                }
            }
            .ant-switch-checked{
                background-color: #f76b1c;
            }
            input, button, select, optgroup, textarea{
                color: #fff;
            }
            .btn_submit{
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
  }
            }
        }
    }
`