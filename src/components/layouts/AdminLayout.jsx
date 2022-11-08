import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from '../pages/adminLayout/Sidebar/Sidebar'

const AdminLayout = () => {
    return (
        <Container className='AdminLayout'>
            <Sidebar />
            <div className='main-content h-full p-16 space-y-2 text-white'>
                <div className='navigation flex justify-end align-items-center gap-16 border-b-orange-300 border-b-2 pb-20'>
                    <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-40 h-40 rounded-full dark:bg-gray-500" />
                    <Button>Log Out</Button>
                </div>
                <Outlet />
            </div>
        </Container>
    )
}

export default AdminLayout

const Container = styled.div`
    &.AdminLayout{
      padding: 0 15px;
      margin: auto;
      box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .Sidebar{
            width: 15%;
            box-shadow: 0 5px 25px 0 rgb(0 0 0 / 50%);
            background-color: #303036;
        }
        .main-content{
            width: 85%;
        }
    }
`;
const Button = styled.button`
  background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  height: 40px;
  width: 110px;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgb(255 88 96 / 50%);
  opacity: 0.85;
  transition: 0.4s ease;
  &:hover {
    opacity: 1;
  }
`;