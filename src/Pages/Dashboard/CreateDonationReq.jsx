import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";




const CreateDonationReq = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    // const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    })
    console.log(users)
    useEffect(() => {
        refetch();
    }, [user, refetch]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {

        const fetchDistricts = async () => {
            const response = await axios.get("/districts.json");
            setDistricts(response.data);
        };
        fetchDistricts();
    }, []);

    useEffect(() => {
        const fetchUpazilas = async () => {
            if (selectedDistrict) {
                try {
                    const response = await axios.get(`/upazilas.json?district_id=${selectedDistrict}`);
                    setUpazilas(response.data);
                } catch (error) {
                    console.error("Error fetching upazilas:", error);
                }
            }
        };

        fetchUpazilas();
    }, [selectedDistrict]);


    const onSubmit = (data) => {
        console.log(data);

        //create user entry in the database
        const userInfo = {
            requesterName: data.requesterName,
            requesterEmail: data.requesterEmail,
            recipientName: data.recipientName,
            recipientEmail: data.recipientEmail,
            bloodGroup: data.bloodGroup,
            district: selectedDistrict,
            upazila: data.upazila,
            hospitalName: data.hospitalName,
            fullAddress: data.fullAddress,
            donationDate: data.donationDate,
            donationTime: data.donationTime,
            status: 'Pending'
        }

        axiosPublic.post('/donation-requests', userInfo)
            .then(res => {
                if (res.data.insertedId) {
                    console.log('user added to the database')
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Donation Request Created Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })

    };


    return (
        <>
            {/* <Helmet>
                <title>BloodPulse | Sign Up</title>
            </Helmet> */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Create A donation request now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Requester Name</span>
                                </label>
                                <input type="text" name="requesterName" {...register("requesterName", { required: true })} placeholder="Name" className="input input-bordered" defaultValue={users ? users.name : ""} readOnly />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Requester Email</span>
                                </label>
                                <input type="email" name="requesterEmail" {...register("requesterEmail", { required: true })} placeholder="Email" className="input input-bordered" defaultValue={user ? user.email : ""} readOnly />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recipient Name</span>
                                </label>
                                <input type="text" name="recipientName" {...register("recipientName", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Recipient Email</span>
                                </label>
                                <input type="email" name="recipientEmail" {...register("recipientEmail", { required: true })} placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Blood Group</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    {...register("bloodGroup", { required: true })}
                                >
                                    <option value="" disabled selected>
                                        Select Your Blood Group
                                    </option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                                {errors.bloodGroup && <span className="text-red-600">Blood Group is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">District</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Your District
                                    </option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.name}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upazila</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    {...register("upazila", { required: true })}
                                >
                                    <option value="" disabled>
                                        Select Your Upazila
                                    </option>
                                    {upazilas.map((upazila) => (
                                        <option key={upazila.id} value={upazila.name}>
                                            {upazila.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.upazila && <span className="text-red-600">Upazila is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Hospital Name</span>
                                </label>
                                <input type="text" name="hospitalName" {...register("hospitalName", { required: true })} placeholder="Hospital Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Address</span>
                                </label>
                                <input type="text" name="fullAddress" {...register("fullAddress", { required: true })} placeholder="Full Address" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donation Date</span>
                                </label>
                                <input type="text" name="donationDate" {...register("donationDate", { required: true })} placeholder="Donation Date" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Request Message</span>
                                </label>
                                <input type="text" name="requestMessage" {...register("requestMessage", { required: true })} placeholder="Write here" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donation Time</span>
                                </label>
                                <input type="text" name="donationTime" {...register("donationTime", { required: true })} placeholder="Donation Time" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Request" />

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateDonationReq;