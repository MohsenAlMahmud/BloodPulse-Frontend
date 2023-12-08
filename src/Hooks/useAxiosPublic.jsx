import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'iridescent-licorice-b247c0.netlify.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
       
};

export default useAxiosPublic;