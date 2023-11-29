import { FaBookOpen, FaRegSmile } from "react-icons/fa";
import { FaCirclePause, FaMessage } from "react-icons/fa6";


const ContactUs = () => {
    return (
        <div>
            <div className="text-center">
                <h2 className="text-6xl font-bold mb-4">Contact Us</h2>
                <p className="mb-6">Whether you have a question, are not sure about whether you can give <br /> blood or just want to say hello, we are happy to hear from you. </p>
            </div>
            <h2 className="text-3xl text-center font-bold mb-8">What would you like to tell us about?</h2>
            <div className="grid grid-cols-2 gap-4 mb-12">                
                <div className="flex border border-red-800 rounded-lg">
                    <div><FaMessage className="text-4xl text-red-800 m-4"></FaMessage></div>
                    <div>
                        <h2 className="text-2xl font-bold my-2">Enquiry/Help form</h2>
                        <p className="mb-4">Whether you have a question or comment that is not related to any medical query please enter your details here and we will be happy to help.</p>
                        <button className="btn bg-red-800 mb-3">Tell us more</button>
                    </div>
                </div>
                <div className="flex border border-red-800 rounded-lg">
                    <div><FaRegSmile className="text-4xl text-red-800 m-4"></FaRegSmile></div>
                    <div>
                        <h2 className="text-2xl font-bold my-2">Medical queries</h2>
                        <p className="mb-4">If you have a medical query relating to whether you can donate blood please complete the form below. Alternatively you can check our Health, Eligibility & Travel section or call us on 0300 123 23 23.</p>
                        <button className="btn bg-red-800 mb-3">Tell us more</button>
                    </div>
                </div>
                <div className="flex border border-red-800 rounded-lg">
                    <div><FaBookOpen className="text-4xl text-red-800 m-4"></FaBookOpen></div>
                    <div>
                        <h2 className="text-2xl font-bold my-2">Send us your story</h2>
                        <p className="mb-4">Have an amazing story about donating or receiving blood? Tell us about this here.</p>
                        <button className="btn bg-red-800 mb-3">Tell us more</button>
                    </div>
                </div>
                <div className="flex border border-red-800 rounded-lg">
                    <div><FaCirclePause className="text-4xl text-red-800 m-4"></FaCirclePause></div>
                    <div>
                        <h2 className="text-2xl font-bold my-2">Compliments or Complaints</h2>
                        <p className="mb-4">Do you want to give us a compliment about our service? Or you are unhappy with our service please let us know and we will try and correct the issue.</p>
                        <button className="btn bg-red-800 mb-3">Tell us more</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
