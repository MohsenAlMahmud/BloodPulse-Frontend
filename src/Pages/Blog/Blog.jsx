import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import HTMLReactParser from "html-react-parser";


const Blog = () => {

    const axiosSecure = useAxiosSecure();
    const { data: blogs = [], } = useQuery({
        queryKey: ['blogs'],
        // enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            console.log(res);
            return res.data;
        }
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
                <div key={blog.id} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={blog.imageUrl} alt="blog" className="w-full h-48 object-cover" />
                    </figure>
                    <div className="card-body p-4">
                        <h2 className="card-title text-xl font-semibold mb-2">{blog.title}</h2>
                        <p className="text-gray-700">{HTMLReactParser(blog.content)}</p>
                        <div className="mt-4 flex justify-end">
                            <button className="btn btn-primary">{blog.status}</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blog;