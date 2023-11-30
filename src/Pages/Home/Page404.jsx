import { Link } from "react-router-dom";



const Page404 = () => {
    return (
        <div className="flex text-center mt-4">
            <div>
                <img src="https://i.ibb.co/xKk65xr/004.jpg" alt="" />
                <Link to="/" className="text-2xl font-semibold underline p-4">Go to Home</Link>
            </div>
        </div>
    );
};

export default Page404;