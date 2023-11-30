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
// import VolunteerHome from "../Pages/Dashboard/VolunteerHome";
import CreateDonationReq from "../Pages/Dashboard/CreateDonationReq";
import MyDonationReq from "../Pages/Dashboard/MyDonationReq";
import AllDonationReq from "../Pages/Dashboard/AllDonationReq";
import ContentManagementAdmin from "../Pages/Dashboard/ContentManagementAdmin";
import AddBlogAdmin from "../Pages/Dashboard/AddBlogAdmin";
import UpdateUserProfile from "../Pages/Dashboard/UpdateUserProfile";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile";
import AllDonationReqVolunteer from "../Pages/Dashboard/AllDonationReqVolunteer";
import VolunteerHomePage from "../Pages/Dashboard/VolunteerHomePage";
import ContentManagementVolunteer from "../Pages/Dashboard/ContentManagementVolunteer";
import BloodDonationDetail from "../Pages/DonationRequest/BloodDonationDetail";
import Page404 from "../Pages/Home/Page404";


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
            path: "/donation-request/bloodDonationDetail/:id",
            element: <PrivateRoutes><BloodDonationDetail></BloodDonationDetail></PrivateRoutes>,
            loader: ({params}) => fetch(`https://bloodpulse.vercel.app/donation-requests/bloodDonationDetail/${params.id}`)
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
        {
          path: '/*',
          element: <Page404></Page404>
      },
        
       
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children: [
        //donors routes
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
          path: 'my-donation-requests',
          element: <MyDonationReq></MyDonationReq>
        },
        {
          path: 'create-donation-request',
          element: <CreateDonationReq></CreateDonationReq>
        },
        {
          path: 'userHome/updateUserProfile',
          element: <UpdateUserProfile></UpdateUserProfile>
        },
        //volunteers route
        {
          path: 'volunteerHome',
          element: <VolunteerHomePage></VolunteerHomePage>
        },
        {
          path: 'all-blood-donation-request-volunteer',
          element: <AllDonationReqVolunteer></AllDonationReqVolunteer>
        },
        {
          path: 'content-management',
          element: <ContentManagementVolunteer></ContentManagementVolunteer>
        },
        {
          path: 'volunteerHome/updateUserProfile',
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
  