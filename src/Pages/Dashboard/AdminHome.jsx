import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect } from "react";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { FaBook, FaDollarSign, FaUsers } from "react-icons/fa";
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // const [userData, setUserData] = useState(null);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);                     
            return res.data;
        }
    })
    useEffect(() => {
        refetch();
    }, [user, refetch]);
    
    // const axiosSecure = useAxiosSecure();

    // const { data: stats } = useQuery({

    //     queryKey: ['admin-stats'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/admin-stats');
    //         return res.data;
    //     }

    // });

    
   

    //custom shape for the bar chart
    // const getPath = (x, y, width, height) => {
    //     return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    //     ${x + width / 2}, ${y}
    //     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    //     Z`;
    // };

    // const TriangleBar = (props) => {
    //     const { fill, x, y, width, height } = props;

    //     return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    // };

    //custom shape for the pai chart
    // const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //             {`${(percent * 100).toFixed(0)}%`}
    //         </text>
    //     );
    // };
    // const paiChartData = chartData.map(data => {
    //     return{name: data?.category, value: data?.revenue}
    // })

    return (
        <div>
            
           <h2 className="text-3xl font-bold my-8">{users?.name} Profile</h2>
           <div className="card bg-base-100 shadow-xl">
                        <img className="w-60 h-72" src={users?.photoURL} alt="Profile Pic" />
                        <div className="card-body">
                            <h2 className="card-title">Name : {users?.name}</h2>
                            <h2 className="card-title">Email Address : {users?.email}</h2>
                            <h2 className="card-title">Blood Group : {users?.bloodGroup}</h2>
                            <h2 className="card-title">District : {users?.district}</h2>
                            <h2 className="card-title">Upazila : {users?.upazila}</h2>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Update Information</button>
                            </div>
                        </div>
                    </div>
            
        </div>
    );
};

export default AdminHome;
