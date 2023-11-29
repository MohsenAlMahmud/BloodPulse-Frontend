import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";
import axios from "axios";
// import SocialLogin from "../Components/SocialLogin/SocialLogin";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

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

    const confirmPassword = watch("confirmPassword", "");

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);

        if (data.password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "Password and Confirm Password do not match.",
            });
            return;
        }

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                // updateUserProfile(data.name, data.image)
                // .then(() => {
                // console.log('user profile info updated');

                //create user entry in the database
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    photoURL: res.data.data.display_url,
                    bloodGroup: data.bloodGroup,
                    district: selectedDistrict,
                    upazila: data.upazila,
                    status: "active"
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('User added to the database')
                            reset();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "You Registered Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })

                // }).catch((error) => {
                // console.log(error)
                // })
            })
    };


    return (
        <>
            <Helmet>
                <title>BloodPulse | Sign Up</title>
            </Helmet>
            <div>
                <div className="text-center py-8">
                    <h1 className="text-5xl font-bold text-red-800">Be a Lifesaver, Donate Blood</h1>
                </div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
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
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]))/ })} placeholder="Password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                    {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 required</span>}
                                    {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less then 20 required</span>}
                                    {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one uppercase,one lowercase, one number and one special character required</span>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered" {...register("confirmPassword", { required: "Confirm Password is required" })} />
                                    {errors.confirmPassword && (
                                        <span className="text-red-600">{errors.confirmPassword.message}</span>
                                    )}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Submit" />

                                </div>
                            </form>
                            <p className="px-6"><small>Already Have an account? <Link to='/login'>Login</Link> </small></p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;