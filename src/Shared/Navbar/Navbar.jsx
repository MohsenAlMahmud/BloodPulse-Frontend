import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider";



const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    // const [cart] = useCart();
    // const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
        // .cath(error => console.log(error))
    }

    const navOptions = <>
        <li className="pt-3"><Link to={"/"}>Home</Link></li>
        <li className="pt-3"><Link to={"/blog"}>Blog</Link></li>
        <li className="pt-3"><Link to={"/donation-request"}>Donation Request</Link></li>
        <li className="pt-3"><Link to={"/dashboard/profile"}>Dashboard</Link></li>
        <li className="pt-3"><Link to={"/funding"}>Funding</Link></li>

    </>

    return (
        <div>
            <div className="navbar bg-red-800">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">
                        <img className="w-16 h-12 rounded-md" src="https://i.ibb.co/rm9NPft/logo.jpg" alt="" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        user ?
                            <>
                                <button onClick={handleLogOut} className="btn btn-ghost">Logout</button>
                            </>
                            :
                            <>
                                <div className="flex gap-4 px-3">
                                    <div><Link to="/signUp"><a className="btn bg-red-800">Registration</a></Link></div>
                                    <div><Link to="/login"><a className="btn bg-red-800">Login</a></Link></div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;