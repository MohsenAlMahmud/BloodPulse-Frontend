import emailjs from '@emailjs/browser';
import { useRef } from 'react';
// import Navbar from './Navbar';

const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_mrcqld8', 'template_rsf066k', form.current, 'q2L5RWVEPfNP2xKWM')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div>
            {/* <Navbar></Navbar> */}
            {/* <h2>This is contact Me page</h2>*/}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content w-full md:w-3/5">                    
                    <div className="card w-full max-w-lg shadow-2xl bg-base-100">
                        <form ref={form} onSubmit={sendEmail} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="user_name" placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="user_email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <label className="label">
                                    <span className="label-text">Your Text</span>
                                </label>
                            <textarea name="message" placeholder="Write here..." className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;