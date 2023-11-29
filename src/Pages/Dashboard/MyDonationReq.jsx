
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyDonationReq = () => {
    const { user } = useAuth();
    console.log(user);    
    const axiosSecure = useAxiosSecure();
    const { data: donations = [] } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('http://localhost:5000/donation-requests');
            return res.data;
        }
    }); 
    const userDonations = donations.filter(request => request.requesterEmail === user.email);
  

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
                        {userDonations.map((request, index) => (
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