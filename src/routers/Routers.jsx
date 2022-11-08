import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import HomeLayout from "../components/pages/userLayout/HomeLayout";
import BookingTicket from "../components/pages/userLayout/BookingTicket";
import DetailPage from "../components/pages/userLayout/DetailPage";
import DashBoard from "../components/pages/adminLayout/DashBoard/DashBoard";
import Films from "../components/pages/adminLayout/Films/Films";
import Showtimes from "../components/pages/adminLayout/Showtimes/Showtimes";
import AdminLayout from "../components/layouts/AdminLayout";
import { Navigate } from "react-router-dom";
import LogInPage from "../components/pages/userLayout/LogInPage";
import SignUp from "../components/pages/userLayout/SignUp";
import AddNew from "../components/pages/adminLayout/Films/AddNew"
import EditFilm from "../components/pages/adminLayout/Films/EditFilm";
import Users from "../components/pages/adminLayout/UsersManage/Users";


const Routers = () => {
  const Routing = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to='/home' />,
        },
        {
          path: "home",
          element: <HomeLayout />,
        },
        {
          path: "details/:movieId",
          element: <DetailPage />
        },
        {
          path: "ticketRoom/:maLichChieu",
          element: <BookingTicket />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <Films />,
        },
        {
          path: "/admin/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/admin/films",
          element: <Films />,
        },
        {
          path: "/admin/films/addnew",
          element: <AddNew />
        },
        {
          path: "/admin/films/edit/:movieId",
          element: <EditFilm />
        },
        {
          path: "/admin/films/showtimes/:movieId/:movieName",
          element: <Showtimes />,
        },

      ]
    },
    {
      path: "login",
      element: <LogInPage />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },

  ]);
  return Routing;
};

export default Routers;
