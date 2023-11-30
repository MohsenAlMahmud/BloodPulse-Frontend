import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaHandHoldingMedical, FaUserFriends } from "react-icons/fa";

const DashboardProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: donations = [] } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('https://bloodpulse.vercel.app/donation-requests');
            return res.data;
        }
    });

    const { data: selectedUsers = [] } = useQuery({
        queryKey: ['selectedUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });
    const { data: allUsers = [], } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })


    const userDonations = donations.filter(request => request.requesterEmail === user.email);


    const userDonationsWithDateObjects = userDonations.map(request => ({
        ...request,
        donationDateObject: parseCustomDate(request.donationDate),
    }));


    const sortedUserDonations = userDonationsWithDateObjects.sort(
        (a, b) => a.donationDateObject - b.donationDateObject
    );


    const recentThreeDonations = sortedUserDonations.slice(0, 3);

    if (recentThreeDonations.length === 0) {
        return (
            <div>
                <h2 className="text-6xl font-bold my-8">Welcome To BloodPulse {selectedUsers?.name}!</h2>

                {selectedUsers?.role !== 'admin' && selectedUsers?.role !== 'volunteer' && (
                    <p>No donation requests found.</p>
                )}
                {(selectedUsers?.role === 'admin' || selectedUsers?.role === 'volunteer') && (
                    <div>
                        {/* <h3 className="text-5xl mb-10">Admin Dashboard</h3> */}
                        <div className="flex w-2/4 mb-10 h-48 bg-sky-200 rounded-lg py-10">
                            <div className="flex-1 flex items-center justify-center">
                                <FaUserFriends className="text-9xl text-blue-700"></FaUserFriends>
                            </div>
                            <div className="flex-1">
                                <p className="text-2xl font-bold text-center">Total Users</p>
                                <p className="text-6xl text-center font-extrabold text-blue-900">{allUsers.length}</p>
                            </div>
                        </div>
                        <div className="flex w-2/4 h-48 bg-sky-200 rounded-lg py-10">
                            <div className="flex-1 flex items-center justify-center">
                                <FaHandHoldingMedical className="text-9xl text-red-800"></FaHandHoldingMedical>
                            </div>
                            <div className="flex-1">
                                <p className="text-2xl font-bold text-center">Total Donation Requests</p>
                                <p className="text-6xl text-center font-extrabold text-red-900">{donations.length}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold my-8">Welcome To BloodPulse {selectedUsers?.name}!</h2>
            <div className="overflow-x-auto">
                {recentThreeDonations.length > 0 && (
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Recipient Name</th>
                                <th>Recipient District</th>
                                <th>Recipient Upazila</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Donation Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentThreeDonations.map((request, index) => (
                                <tr key={request._id}>
                                    <td>{index + 1}</td>
                                    <td>{request.recipientName}</td>
                                    <td>{request.district}</td>
                                    <td>{request.upazila}</td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.donationTime}</td>
                                    <td>#</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
};


const parseCustomDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
};

export default DashboardProfile;