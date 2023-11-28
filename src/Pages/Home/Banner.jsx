import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>                        
                        <Link to="/signUp"><button className="btn btn-primary my-10">Join Us As A Donor</button></Link>
                        <br />
                        <Link to="/search"><button className="btn btn-primary">Search Donors</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;