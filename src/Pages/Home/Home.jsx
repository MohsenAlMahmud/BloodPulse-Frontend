import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import FeaturedSection from "./FeaturedSection";
import BenifitOfBloodDonation from "./BenifitOfBloodDonation";
import ContactUs from "./ContactUs";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BloodPulse | Home</title>
            </Helmet>            
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <BenifitOfBloodDonation></BenifitOfBloodDonation>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;