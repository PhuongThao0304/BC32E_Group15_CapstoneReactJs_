import React from 'react'
import styled from "styled-components";
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { signUpAction } from '../../../store/filmManage';
import * as Yup from 'yup'

const SignUp = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    email: Yup.string().email('Email không đúng định dạng'),
    matKhau: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
       .oneOf([Yup.ref('matKhau'), null], 'Passwords must match')
  })

  const formik = useFormik({
    initialValues: {
      taiKhoan: "string",
      matKhau: "string",
      email: "string",
      soDt: "string",
      maNhom: "string",
      hoTen: "string",
    
      
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('errors', formik.errors)
      console.log('values', values)
      dispatch(signUpAction(values))
        .then(() => {
          alert('Đăng ký thành công')
      navigate('/home')
        })

    },
  });

  console.log('errors', formik.errors)

 



  return (
    <Container>
      <div className='min-h-screen SignupPage'>
        <div className="main-content py-20 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <NavLink
            className="flex title-font font-medium items-center mb-4 md:mb-0"
            to="/home"
          >
            <span className="title ml-3 text-5xl text-orange-500" >MOVIE</span>
          </NavLink>

        </div>


        {/* form */}
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Flowbite
          </a> */}
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                {/* form */}
                <form onSubmit={(e) => {
                  console.log(e)
                  e.preventDefault()
                  formik.handleSubmit(e)
                }} className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="taiKhoan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản</label>
                    <input onChange={formik.handleChange} type="text" name="taiKhoan" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tài khoản" required />
                  </div>
                  <div>
                    <label htmlFor="hoTen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ tên</label>
                    <input onChange={formik.handleChange} type="text" name="hoTen" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Họ tên" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>
                    <input onChange={formik.handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <p className='text-red-500'>{formik.errors.email}</p>
                  <div>
                    <label htmlFor="soDt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                    <input onChange={formik.handleChange} type="text" name="soDt" id="soDt" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Số điện thoại" required />
                  </div>
                  <div>
                    <label htmlFor="maNhom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã nhóm</label>
                    <input onChange={formik.handleChange} type="text" name="maNhom" id="maNhom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mã nhóm" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input onChange={formik.handleChange} type="password" name="matKhau" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận password</label>
                    <input onChange={formik.handleChange} type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <p className='text-red-500'>{formik.errors.confirmPassword}</p>
                  </div>
                 
                  

                 { (formik.errors.email || formik.errors.confirmPassword) ?  <Button type="submit" disabled >Create an account</Button> : <Button type="submit" >Create an account</Button> 

                 }
                  
                 
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <NavLink to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

    </Container>
  )
}

export default SignUp



const Container = styled.div`
    &.SignupPage {

      .button {
      background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      height: 50px;
      width: 150px;
      border-radius: 4px;
      box-shadow: 0 0 20px 0 rgb(255 88 96 / 50%);
      opacity: 0.85;
      transition: 0.4s ease;
      &:hover {
        opacity: 1;
      }
    }
        
    }
`

const Button = styled.button`
  background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  height: 50px;
  width: 100%;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgb(255 88 96 / 50%);
  opacity: 0.85;
  transition: 0.4s ease;
  &:hover {
    opacity: 1;

    
  }
`;
