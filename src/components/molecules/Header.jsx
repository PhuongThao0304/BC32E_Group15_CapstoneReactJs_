import React, { Fragment } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUserManage } from "../../store/filmManage";

const Header = () => {
  const navigate = useNavigate()
  const {userLogin, isLoggin } = useUserManage()
console.log(isLoggin)
  const renderLogin = () => {
    if (localStorage.getItem('User_Login')) {
      return (
        <>
       <span className="text-white mr-5"> Xin chào {userLogin.taiKhoan}</span>
       <Button className="btn_signOut" onClick={() => {localStorage.removeItem('User_Login')
       navigate('/home')
       window.location.reload()
       }}>Đăng xuất</Button>
       </>
      )

    }
    return (
      <>
        <Button className="btn_login" onClick={() => navigate('/login')}>LOGIN</Button>
        <Button className="btn_signUp" onClick={() => navigate('/signup')}>SIGN UP</Button>
      </>
    )
  }
  return (
    <Container className="Header">
      <header className="container body-font">
        <div className="main-content py-20 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <NavLink
            className="flex title-font font-medium items-center mb-4 md:mb-0"
            to="/home"
          >
            <span className="title ml-3 text-5xl">MOVIE</span>
          </NavLink>
          <nav className="nav_header md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <NavLink className="mr-28" to="home">
              Home
            </NavLink>
            <NavLink className="mr-28" to="home">Showing Movie</NavLink>
            <NavLink className="mr-28" to="home">Coming Soon</NavLink>
            <NavLink className="mr-28" to="bookingTicket">
              Booking
            </NavLink>
          </nav>
          {renderLogin()}
          {/* <Button className="btn_login" onClick={() => navigate('/login')}>LOGIN</Button>
          <Button className="btn_signUp">SIGN UP</Button> */}
        </div>
      </header>

      {/* <button>SHOW MORE</button> */}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  &.Header {
    
    .container {
      max-width: 1280px;
      padding: 0 35px;
      margin: auto;
      box-sizing: border-box;
      .main-content {
      }
      .title {
        font-weight: 700;
        background: -webkit-linear-gradient(
              90deg,
              #fad961 0%,
              #f76b1c 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
      }
      .nav_header {
        a {
          cursor: pointer;
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.75);
          &:hover {
            background: -webkit-linear-gradient(
              90deg,
              #fad961 0%,
              #f76b1c 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }
`;

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
`;
