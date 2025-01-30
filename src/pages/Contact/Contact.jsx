import { useState } from 'react'
import { LuMap, LuGlobe, LuPhone, LuMail } from 'react-icons/lu'
import HeroSection from '../../components/HeroSection/HeroSection'
import axios from 'axios'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = ({target}) => setFormData({ ...formData, [target.name]: target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const headers = { headers: { 'Content-Type': 'application/json' } };
            const response = await axios.post("https://api.teintoo.com/api.php/contact", JSON.stringify(formData), headers);

            if (response.status === 200) {
                setError("");
                setSuccess(response.data.message);
                setFormData({});
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);

            if (error.response.data.status === 400) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <HeroSection title="Contact Us" />

            <section className="contact">
                <div className="container">
                    <div className="row align-items-stretch">
                        <div className="col-lg-5 col-xl-4 mb-4 mb-lg-0">
                            <div className="card contact-details-box shadow">
                                <div className="card-body p-4">
                                    {/* <div className="mb-5">
                                        <h5 className="card-title mb-4">Open Hours</h5>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span>Monday - Friday</span>
                                            <span>09 AM - 07 PM</span>
                                        </div><hr />
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span>Saturday</span>
                                            <span>09 AM - 02 PM</span>
                                        </div><hr />
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span>Sunday</span>
                                            <span>Closed</span>
                                        </div><hr />
                                    </div> */}

                                    <div className="contact-details">
                                        <h5 className="card-title mb-4">Info location</h5>
                                        <div className="d-flex align-items-start gap-3 mb-3">
                                            <span><LuMap /></span>
                                            <span>3119 SHEPPARD AVE EAST #101, TORONTO, Ontario, M1T3J8</span>
                                        </div>
                                        <div className="d-flex align-items-start gap-3 mb-3">
                                            <span><LuPhone /></span>
                                            <span><a href="tel:647-883-9619" className='text-white'>647-883-9619</a></span>
                                        </div>
                                        <div className="d-flex align-items-start gap-3 mb-3">
                                            <span><LuMail /></span>
                                            <span><a href="mailto:info@4yourhouse.ca" className='text-white'>info@4yourhouse.ca</a></span>
                                        </div>
                                        <div className="d-flex align-items-start gap-3">
                                            <span><LuGlobe /></span>
                                            <span>www.4yourhouse.ca</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-xl-8">
                            <div className="card contact-form shadow">
                                <div className="card-body p-4">
                                    <h4 className="card-title mb-4">Contact Us</h4>
                                    <form onSubmit={handleSubmit}>
                                        {error ? (
                                            <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                {error}
                                            </div>
                                        ) : ""}

                                        {success ? (
                                            <div className="alert alert-success alert-dismissible fade show mb-3" role="alert">
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                {success}
                                            </div>
                                        ) : ""}

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input type="text" name="name" value={formData?.name || ""} className="form-control mb-3" placeholder="Your Name" onChange={handleChange} required />
                                            </div>
                                            <div className="col-lg-6">
                                                <input type="email" name="email" value={formData?.email || ""} className="form-control mb-3" placeholder="Your Email" onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input type="text" name="phone" value={formData?.phone || ""} className="form-control mb-3" placeholder="Your Phone" onChange={handleChange} required />
                                            </div>
                                            <div className="col-lg-6">
                                                <input type="text" name="subject" value={formData?.subject || ""} className="form-control mb-3" placeholder="Your Subject" onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <textarea rows={8} name="message" value={formData?.message || ""} className="form-control" placeholder="Your Message" onChange={handleChange} required></textarea>
                                        </div>
                                        <button type="submit" disabled={loading} className="btn btn-primary w-100">Send Message</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact