import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const DonationRequest = () => {
    const axiosPublic = useAxiosPublic();

    const { data: donationRequests = [] } = useQuery({
        queryKey: ['donationRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donation-requests');
            return res.data;
        }
    });
    console.log(donationRequests)

    return (
        <div className="">
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead className=" p-4">
                        <tr className="text-xl font-bold ">
                            <th>#</th>
                            <th>Name</th>
                            <th>District</th>
                            <th>Upazila</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {donationRequests.map((donationRequest, index) => (
                            <tr className="" key={donationRequest.id}>
                                <td>{index + 1}</td>
                                
                                <td>{donationRequest.requesterName}</td>
                                <td>{donationRequest.district}</td>
                                <td>{donationRequest.upazila}</td>
                                <td>{donationRequest.donationDate}</td>
                                <td>{donationRequest.donationTime}</td>
                                <td><Link to={`bloodDonationDetail/${donationRequest._id}`}><button className="btn btn-sm btn-primary">View</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationRequest;