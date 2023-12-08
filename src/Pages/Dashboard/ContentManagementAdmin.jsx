import { useQuery } from "@tanstack/react-query";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const ContentManagementAdmin = () => {

    const axiosSecure = useAxiosSecure();

    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs'],
        // enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            // console.log(res);
            return res.data;
        }
    })

    const [searchResults, setSearchResults] = useState([]);
    const [searchParams, setSearchParams] = useState({
        status: "",
    });

    const handleSearch = () => {
        const results = blogs.filter((blog) => {
            const statusMatch = !searchParams.status || blog.status === searchParams.status;

            return statusMatch;
        });
        setSearchResults(results);

    };

    useEffect(() => {
        // Initialize searchResults with all blogs when the component mounts
        setSearchResults(blogs);
    }, [blogs]);

    const handleMakePublish = blog => {
        axiosSecure.patch(`/blogs/admin/${blog._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${blog.status} is an Publish now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    return (
        <div>
            <h1 className='text-3xl my-8'>Search Blogs...</h1>
            <div>
                <div>
                    <div className="flex gap-5">
                        <div className="form-control">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={searchParams.status}
                                onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
                            >
                                <option value="" disabled>
                                    Select Status
                                </option>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn bg-red-800 my-3" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="w-full text-right">
                <Link to="add-blog"><button className="btn btn-accent">Add Blog</button></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-11">
                {searchResults.map((blog) => (
                <div key={blog.id} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={blog.imageUrl} alt="blog" className="w-64 h-48 object-cover" />
                    </figure>
                    <div className="card-body p-4">
                        <h2 className="card-title text-xl font-semibold mb-2">{blog.title}</h2>
                        <p className="text-gray-700">{HTMLReactParser(blog.content)}</p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => handleMakePublish(blog)} className="btn btn-primary">{blog.status}</button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default ContentManagementAdmin;

