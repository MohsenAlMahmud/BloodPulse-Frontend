import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const DonationRequest = () => {

    const axiosPublic = useAxiosPublic();
    const { data: donationRequests = [], } = useQuery({
        queryKey: ['donationRequests'],
        // enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosPublic.get('/donation-requests');
            console.log(res);
            return res.data;
        }
    })

    return (
        <div className="">
            {donationRequests.map((donationRequest) => (
                <div key={donationRequest.id}>
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                            <thead className="">
                                <tr className="">
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>District</th>
                                    <th>Upazila</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>{donationRequest.requesterName}</td>
                                    <td>{donationRequest.district}</td>
                                    <td>{donationRequest.upazila}</td>
                                    <td>{donationRequest.donationDate}</td>
                                    <td>{donationRequest.donationTime}</td>
                                    <td><button className="btn btn-sm btn-primary">View</button></td>
                                </tr>

                            </tbody>

                        </table>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default DonationRequest;