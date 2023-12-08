import { FaBlogger, FaHandHolding, FaHandHoldingMedical, FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";


const Dashboard = () => {
    const { user } = useAuth();    
    const [isAdmin] = useAdmin(); 
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);                     
            return res.data;
        }
    })
    useEffect(() => {
        refetch();
    }, [user, refetch]);    


    return (
        <div className="md:flex max-w-7xl mx-auto">
            {/* dashboard side bar */}
            <div className="w-64 md:min-h-screen bg-red-800">
                <ul className="menu p-4">
                    {
                        isAdmin
                            ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome" exact><FaHome></FaHome>Admin Profile</NavLink>
                                </li>                                
                                <li>
                                    <NavLink to="/dashboard/users"><FaUsers></FaUsers>All Users</NavLink>                                    
                                </li>
                                <li>
                                <NavLink to="/dashboard/all-blood-donation-request"><FaHandHoldingMedical></FaHandHoldingMedical>All Blood Donation Req.</NavLink>                                    
                                </li>
                                <li>
                                    <NavLink to="/dashboard/content-management-admin"><FaBlogger></FaBlogger>Content Management</NavLink>                                    
                                </li>
                            </>
                            : users.role === 'volunteer' ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/volunteerHome"><FaHome></FaHome>Volunteer Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/all-blood-donation-request-volunteer"><FaHandHoldingMedical></FaHandHoldingMedical>All Blood Donation Req</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/content-management-volunteer"><FaBlogger></FaBlogger>Content Management</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome"><FaHome></FaHome>Donor Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-donation-requests"><FaHandHoldingMedical></FaHandHoldingMedical>My Donation Req</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/create-donation-request"><FaHandHolding className="text-white"></FaHandHolding> Create Donation Req</NavLink>
                                </li>
                                
                            </>


                    }
                    {/* Shared Nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/"><FaHome></FaHome>Home</NavLink>
                    </li>
                    
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 md:p-8">
                {/* <DashboardProfile></DashboardProfile> */}
                <Outlet></Outlet>                
            </div>
        </div>
    );
};

export default Dashboard;