import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const BloodDonationDetail = () => {
    const axiosPublic = useAxiosPublic();
    const params = useParams();

    const { data: donationRequestDetails, isLoading, isError } = useQuery({
        queryKey: ['donationRequestDetails', params.id],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/donation-requests/${params.id}`);
                return res.data;
            } catch (error) {
                throw new Error('Error fetching donation request details');
            }
        }
    });



    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !donationRequestDetails) {
        return <p>Donation request details not found.</p>;
    }


    return (
        <div>
            <h2 className="text-5xl font-bold text-center my-8">Blood Donation Detail</h2>
            <div className="px-4">
                <p className="text-3xl font-semibold mb-3">Recipient Name : {donationRequestDetails.recipientName}</p>
                <p className="text-3xl font-semibold mb-3">Recipient Email : {donationRequestDetails.recipientEmail}</p>
                <p className="text-3xl font-semibold mb-3">Requester Name : {donationRequestDetails.requesterName}</p>
                <p className="text-3xl font-semibold mb-3">Requester Email : {donationRequestDetails.requesterEmail}</p>
                <p className="text-3xl font-semibold mb-3">Blood Group : {donationRequestDetails.bloodGroup}</p>
                <p className="text-3xl font-semibold mb-3">Hospital Name : {donationRequestDetails.hospitalName}</p>
                <p className="text-3xl font-semibold mb-3">Full Address : {donationRequestDetails.fullAddress}</p>
                <p className="text-3xl font-semibold mb-3">District : {donationRequestDetails.district}</p>
                <p className="text-3xl font-semibold mb-3">Upazila : {donationRequestDetails.upazila}</p>
                <p className="text-3xl font-semibold mb-3">Donation Date : {donationRequestDetails.donationDate}</p>
                <p className="text-3xl font-semibold mb-3">Donation Time : {donationRequestDetails.donationTime}</p>
                <p className="text-3xl font-semibold mb-3">Status : {donationRequestDetails.status}</p>
            </div>


        </div>
    );
};

export default BloodDonationDetail;