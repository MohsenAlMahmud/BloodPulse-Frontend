import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
// import { useState } from "react";
// import { useEffect } from "react";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        // enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            // console.log(res);
            return res.data;
        }
        
    })
    // console.log(users);

    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axiosSecure.get('/users');
    //             setUsers(res.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [axiosSecure]);

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Volunteer now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        } else {
                            Swal.fire({
                                title: "Failed!",
                                text: "Unable to delete the file.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while trying to delete the file.",
                            icon: "error"
                        });
                        console.error("Axios request failed:", error);
                    });
            }
        });
    };

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <div className="text-3xl">All users</div>
                <div className="text-3xl">Total Users: {users.length}</div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.length >0 && users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user?.role === 'volunteer' ? (
                                        <>
                                            Volunteer                                            
                                        </>
                                    ) : user?.role === 'admin' ? (
                                        <>
                                            Admin
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-lg bg-red-700">
                                                <FaPlusCircle className="text-white text-2xl"></FaPlusCircle>
                                            </button>
                                        </>
                                    )}
                                </td>
                                <td><button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt></button></td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllUsers; 