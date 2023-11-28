// import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const MyDonationReq = () => {
    // const { user } = useAuth();
    // console.log(user);
    // const axiosSecure = useAxiosSecure();
    // const { data: users = [] } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('http://localhost:5000/donation-requests');
    //         return res.data;
    //     }
    // });

    const [users, setUsers] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/donation-requests');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user]); //

    return (
        <div>
            <h1 className='text-3xl my-8'>My Donation Requests</h1>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Recipient Name</th>
                            <th>Recipient District</th>
                            <th>Recipient Upazila</th>
                            {/* <th>Blood Group</th> */}
                            <th>Date</th>
                            <th>Time</th>
                            <th>Donation Status</th>
                            {/* <th>Donor Name</th> */}
                            {/* <th>Donor Email</th> */}
                            {/* <th>Edit</th> */}
                            {/* <th>Delete</th> */}
                            {/* <th>View</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.recipientName}</td>
                                <td>{request.district}</td>
                                <td>{request.upazila}</td>
                                {/* <td>{request.bloodGroup}</td> */}
                                <td>{request.donationDate}</td>
                                <td>{request.donationTime}</td>
                                <td>#</td>
                                {/* <td>{user.displayName}</td> */}
                                {/* <td>{user.email}</td> */}
                                {/* <td>#</td> */}
                                {/* <td>#</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonationReq;