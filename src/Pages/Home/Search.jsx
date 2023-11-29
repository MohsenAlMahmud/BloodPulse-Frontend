import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import axios from "axios";


const Search = () => {

    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: donors = [] } = useQuery({
        queryKey: ['donors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    // const [selectedDistrict, setSelectedDistrict] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams, setSearchParams] = useState({
        bloodGroup: "",
        district: "",
        upazila: "",
        email: ""
    });
    useEffect(() => {
        const fetchDistricts = async () => {
            const response = await axios.get("/districts.json");
            setDistricts(response.data);
        };
        fetchDistricts();
    }, []);
    useEffect(() => {
        const fetchUpazilas = async () => {
            const response = await axios.get("/upazilas.json");
            setUpazilas(response.data);
        };
        fetchUpazilas();
    }, []);


    const handleSearch = () => {
        const results = donors.filter((donor) => {
            const bloodGroupMatch = !searchParams.bloodGroup || donor.bloodGroup === searchParams.bloodGroup;
            const districtMatch = !searchParams.district || donor.district === searchParams.district;
            const upazilaMatch = !searchParams.upazila || donor.upazila === searchParams.upazila;
            const emailMatch = !searchParams.email || donor.email.includes(searchParams.email);

            return bloodGroupMatch && districtMatch && upazilaMatch && emailMatch;
        });
        setSearchResults(results);
        
    };

    return (
        <div className="my-12">
            <h1 className='text-3xl my-8'>Search Donor...</h1>
            <div>
                <div>
                    <div className="flex gap-5">
                        <div className="form-control">
                            <label className="label">                                
                            </label>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={searchParams.bloodGroup}
                                onChange={(e) => setSearchParams({ ...searchParams, bloodGroup: e.target.value })}
                            >
                                <option value="" disabled>
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
                        </div>
                        <div className="form-control">
                            <label className="label">                                
                            </label>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={searchParams.district}
                                onChange={(e) => setSearchParams({ ...searchParams, district: e.target.value })}
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
                    </div>
                    <div className="flex gap-5">
                        <div className="form-control">
                            <label className="label">                                
                            </label>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={searchParams.upazila}
                                onChange={(e) => setSearchParams({ ...searchParams, upazila: e.target.value })}
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
                        </div>
                        <input
                            type="text"
                            placeholder="Type your email here"
                            className="input input-bordered input-md mt-4 w-full max-w-xs"
                            value={searchParams.email}
                            onChange={(e) => setSearchParams({ ...searchParams, email: e.target.value })}
                        />
                    </div>
                    <button className="btn bg-red-800 my-3" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Donor Name</th>
                            <th>Donor District</th>
                            <th>Donor Upazila</th>
                            <th>Blood Group</th>
                            <th>Donor Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((donor, index) => (
                            <tr key={donor._id}>
                                <td>{index + 1}</td>
                                <td>{donor.name}</td>
                                <td>{donor.district}</td>
                                <td>{donor.upazila}</td>
                                <td>{donor.bloodGroup}</td>
                                <td>{donor.email}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Search;