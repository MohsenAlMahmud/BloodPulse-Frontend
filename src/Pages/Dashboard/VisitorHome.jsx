import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const VisitorHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    // console.log(users)
    useEffect(() => {
        refetch();
    }, [user, refetch]);
    return (
        <div>

            <h2 className="text-3xl font-bold my-8">{users?.name} Profile</h2>
            <div className="card bg-base-100 shadow-xl">
                <img className="w-60 h-72" src={users?.photoURL} alt="Profile Pic" />
                <div className="card-body">
                    <h2 className="card-title">Name : {users?.name}</h2>
                    <h2 className="card-title">Email Address : {users?.email}</h2>
                    <h2 className="card-title">Blood Group : {users?.bloodGroup}</h2>
                    <h2 className="card-title">District : {users?.district}</h2>
                    <h2 className="card-title">Upazila : {users?.upazila}</h2>

                    <div className="card-actions justify-end">
                        <Link to="/dashboard/userHome/updateUserProfile"><button className="btn btn-primary">Update Information</button></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VisitorHome;



