import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/8MyQRfY/banner.png)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-red-800">Donate Today Save Lives Tomorrow</h1>                        
                        <Link to="/signUp"><button className="btn bg-red-800 my-10">Join Us As A Donor</button></Link>
                        <br />
                        <Link to="/search"><button className="btn bg-red-800">Search Donors</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;