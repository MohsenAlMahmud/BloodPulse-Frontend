import { FaCalendar, FaEnvelope, FaHome, FaSearch, FaShoppingCart, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
// import DashboardProfile from "../Pages/Dashboard/DashboardProfile";





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
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin
                            ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome" exact><FaHome></FaHome>Home Page</NavLink>
                                </li>                                
                                <li>
                                    <NavLink to="/dashboard/users"><FaUsers></FaUsers>All Users</NavLink>                                    
                                </li>
                                <li>
                                <NavLink to="/dashboard/all-blood-donation-request"><FaUsers></FaUsers>All Blood Donation Req.</NavLink>                                    
                                </li>
                                <li>
                                    <NavLink to="/dashboard/content-management"><FaUsers></FaUsers>Content Management</NavLink>                                    
                                </li>
                            </>
                            : users.role === 'volunteer' ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome"><FaHome></FaHome>Volunteer Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history"><FaCalendar></FaCalendar>All Blood Donation Req</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart>Content Management</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome"><FaHome></FaHome>Donor Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-donation-requests"><FaCalendar></FaCalendar>My Donation Req</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/create-donation-request"><FaShoppingCart></FaShoppingCart>Create Donation Req</NavLink>
                                </li>
                                
                            </>


                    }
                    {/* Shared Nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/"><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"><FaSearch></FaSearch>Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact"><FaEnvelope></FaEnvelope>Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                {/* <DashboardProfile></DashboardProfile> */}
                <Outlet></Outlet>                
            </div>
        </div>
    );
};

export default Dashboard;