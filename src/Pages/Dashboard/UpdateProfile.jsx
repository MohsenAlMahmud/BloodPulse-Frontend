import { useContext, useEffect, useState } from "react";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
    const {user} = useAuth();
    // console.log(user)
    const { updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {
        // Fetch districts without axios
        fetch("/districts.json")
            .then(response => response.json())
            .then(data => setDistricts(data))
            .catch(error => console.error("Error fetching districts:", error));
    }, []);

    useEffect(() => {
        const fetchUpazilas = async () => {
            if (selectedDistrict) {
                try {
                    // Fetch upazilas without axios
                    const response = await fetch(`/upazilas.json?district_id=${selectedDistrict}`);
                    const data = await response.json();
                    setUpazilas(data);
                } catch (error) {
                    console.error("Error fetching upazilas:", error);
                }
            }
        };
        fetchUpazilas();
    }, [selectedDistrict]);

    const onSubmit = async (data) => {
        if (!user || !user.email) {
            console.error("User not found or missing user id");
            return;
        }

        const userEmail = user.email;
        const updatedUserInfo = {
            name: data.name,
            bloodGroup: data.bloodGroup,
            district: selectedDistrict,
            upazila: data.upazila,
        };

        // Handle image upload separately
        const formData = new FormData();
        if (data.image) {
            formData.append('image', data.image[0]); // Assuming 'image' is the field name for the image
            try {
                const imageUploadResponse = await axiosPublic.post(image_hosting_api, formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                });
                updatedUserInfo.photoURL = imageUploadResponse.data.data.display_url;
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle image upload error
            }
        }

        axiosPublic.patch(`/users/${userEmail}`, updatedUserInfo)
            .then((response) => {
                console.log(response.data);
                updateUserProfile(updatedUserInfo);
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch((error) => {
                console.error("Error updating user profile:", error);
                // Handle errors, display error messages, etc.
            });
    };


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>

                        <div className="form-control w-full my-6">
                            <input type="file" {...register('image', { required: true })} className="file-input w-full max-w-xs" />
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


                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Update Profile" />

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;