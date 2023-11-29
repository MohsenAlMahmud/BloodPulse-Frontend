import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import Secret from "../Shared/Secret/Secret";
import PrivateRoutes from "./PrivateRoutes";

import Dashboard from "../Layout/Dashboard";
import VisitorHome from "../Pages/Dashboard/VisitorHome";
import AdminHome from "../Pages/Dashboard/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import Blog from "../Pages/Blog/Blog";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import Funding from "../Pages/Funding/Funding";
import Search from "../Pages/Home/Search";
import VolunteerHome from "../Pages/Dashboard/VolunteerHome";
import CreateDonationReq from "../Pages/Dashboard/CreateDonationReq";
import MyDonationReq from "../Pages/Dashboard/MyDonationReq";
import AllDonationReq from "../Pages/Dashboard/AllDonationReq";
import ContentManagementAdmin from "../Pages/Dashboard/ContentManagementAdmin";
import AddBlogAdmin from "../Pages/Dashboard/AddBlogAdmin";
import UpdateUserProfile from "../Pages/Dashboard/UpdateUserProfile";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/blog",
            element: <Blog></Blog>,
        },
        {
            path: "/donation-request",
            element: <DonationRequest></DonationRequest>,
        },
        {
            path: "/funding",
            element: <Funding></Funding>,
        },
        {
            path: "/search",
            element: <Search></Search>,
        },
        {
            path: "login",
            element: <Login></Login>,
        },
        {
          path: 'signUp',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
        },
        
       
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children: [
        //visitors routes
        {
          path: 'userHome',
          element: <VisitorHome></VisitorHome>
        },
        {
          path: 'profile',
          element: <DashboardProfile></DashboardProfile>
        },
        {
          path: 'profile/updateInfo',
          element: <UpdateProfile></UpdateProfile>
        },        
        {
          path: 'volunteerHome',
          element: <VolunteerHome></VolunteerHome>
        },
        {
          path: 'my-donation-requests',
          element: <MyDonationReq></MyDonationReq>
        },
        {
          path: 'create-donation-request',
          element: <CreateDonationReq></CreateDonationReq>
        },
        {
          path: 'userHome/updateUserProfile/:id',
          element: <UpdateUserProfile></UpdateUserProfile>
        },
        
        // {
        //   path: 'cart',
        //   element: 
        // },

        
        //admin route
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'users',
          element: <AllUsers></AllUsers>
        },
        {
          path: 'all-blood-donation-request',
          element: <AllDonationReq></AllDonationReq>
        },
        {
          path: 'content-management',
          element: <ContentManagementAdmin></ContentManagementAdmin>
        },
        {
          path: 'content-management/add-blog',
          element: <AddBlogAdmin></AddBlogAdmin>
        },
      ]
    }
  ]);