
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UpdateUserProfile = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: currentUserData, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`http://localhost:5000/users/${user.email}`);
            return res.data;
        }
    });

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: currentUserData?.name || "",
            // bloodGroup: currentUserData?.bloodGroup || "",
            // district: currentUserData?.district || "",
            // upazila: currentUserData?.upazila || "",
        }
    });

    useEffect(() => {
        refetch();
        setValue("name", currentUserData?.name || "");
        setValue("bloodGroup", currentUserData?.bloodGroup || "");
        setValue("district", currentUserData?.district || "");
        setValue("upazila", currentUserData?.upazila || "");
    }, [user, refetch, currentUserData, setValue]);

    const onSubmit = async (data) => {
        try {
            const updatedUserData = {
                name: data.name,
                // bloodGroup: data.bloodGroup,
                // district: data.district,
                // upazila: data.upazila,
            };

            const res = await axiosPublic.patch(`http://localhost:5000/users/${user.email}`, updatedUserData);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User information updated successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Optionally refetch the data to update the UI
                refetch();
            }
        } catch (error) {
            console.error("Error updating user information:", error);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold my-8">Update Your Profile</h2>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                        {/* Add similar input fields for bloodGroup, district, upazila */}

                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary">
                                Update Information
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserProfile;