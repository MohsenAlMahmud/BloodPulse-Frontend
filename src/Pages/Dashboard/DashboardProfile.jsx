import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

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

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    

    const userDonations = donations.filter(request => request.requesterEmail === user.email);
   
    // Parse the donation dates into JavaScript Date objects
    const userDonationsWithDateObjects = userDonations.map(request => ({
        ...request,
        donationDateObject: parseCustomDate(request.donationDate),
    }));

    // Sort the donations by the donation date in ascending order (oldest to newest)
    const sortedUserDonations = userDonationsWithDateObjects.sort(
        (a, b) => a.donationDateObject - b.donationDateObject
    );

    // Get the first three items (most recent donations)
    const recentThreeDonations = sortedUserDonations.slice(0, 3);

    if (recentThreeDonations.length === 0) {
        // No donation requests, so don't render the table
        return (
            <div>
                <h2 className="text-3xl font-bold my-8">Welcome To Blood Pulse {users?.name}!</h2>
                <p>No donation requests found.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold my-8">Welcome To Blood Pulse {users?.name}!</h2>
            <div className="overflow-x-auto">
                {/* Conditionally render the table based on donation requests */}
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

// Custom function to parse "DD.MM.YYYY" date format
const parseCustomDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date object
};

export default DashboardProfile;