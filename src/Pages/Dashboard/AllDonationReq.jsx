import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
// import { useState } from 'react';
// import { useEffect } from 'react';




const AllDonationReq = () => {
    const { user } = useAuth();
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: donations = [], } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-requests');
            return res.data;
        }
    })
    console.log(donations);

    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axiosSecure.get('/donation-requests');
    //             setUsers(res.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [axiosSecure]);
    return (
        <div>
            <h1 className='text-3xl my-8'>Donation Requests</h1>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Recipient Name</th>
                            <th>Recipient District</th>
                            <th>Recipient Upazila</th>
                            <th>Blood Group</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Donation Status</th>
                            <th>Donor Name</th>
                            <th>Donor Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.requesterName}</td>
                                <td>{request.district}</td>
                                <td>{request.upazila}</td>
                                <td>{request.bloodGroup}</td>
                                <td>{request.donationDate}</td>
                                <td>{request.donationTime}</td>
                                <td>#</td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>#</td>
                                <td>#</td>
                                <td>#</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDonationReq;