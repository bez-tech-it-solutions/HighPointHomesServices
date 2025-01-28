/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaCheck } from 'react-icons/fa6'
import { fetchApi } from "../../utils/fetchApi"
import { loadFromLocalStorage } from '../../utils/localStorage'
import LoginModal from '../../components/LoginModal/LoginModal'
import axios from 'axios'
import './Footer.css'

const Footer = () => {
    const [profile, setProfile] = useState(loadFromLocalStorage('profile', null));
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({ subscribe: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const fetchProperties = useCallback(async () => {
        setLoading(true);

        await fetchApi({
            path: `/properties?limit=10`,
            setLoading,
            setState: (response) => setProperties(response.data || []),
        });
    }, []);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const handleChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("https://api.teintoo.com/api.php/subscribe", JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.status === 200) {
                setMessage("Successfully subscribed");
                setFormData({});
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                setMessage(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <section className="advertisement">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mb-5 mb-lg-0">
                            <h3 className="text-center text-lg-start mb-2 mb-lg-3">Looking To Sell Or Rent Your Property?</h3>
                            <p className="text-center text-lg-start mb-0">Get in touch with us.</p>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-center justify-content-lg-end">
                            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalId">Sign Up</button>
                            <LoginModal setProfile={setProfile} />
                        </div>
                    </div>
                </div>
            </section>

            <footer className='text-light'>
                <div className="container">
                    <div className="row gx-lg-5">
                        <div className="col-lg-3 col-xl-4 mb-5 mb-lg-0">
                            <img src="/logo.svg" className='mb-3' width={100} alt="" />
                            <p className="mb-0">High Point Home Services is a leading real estate consultancy in Canada. We have helped countless clients discover their dream homes and secure the perfect properties tailored to their unique needs.</p>
                            {/* <div className="social-icons">
                                <div className="facebook-icon">
                                    <FaFacebookF />
                                </div>
                                <div className="twitter-icon">
                                    <FaTwitter />
                                </div>
                                <div className="linkedin-icon">
                                    <FaLinkedinIn />
                                </div>
                                <div className="instagram-icon">
                                    <LuInstagram />
                                </div>
                                <div className="youtube-icon">
                                    <FaYoutube />
                                </div>
                            </div> */}
                        </div>
                        <div className="col-lg-2 col-xl-2 mb-5 mb-lg-0">
                            <h4 className='footer-heading'>Quick Links</h4>
                            <div className="d-flex flex-column gap-2">
                                <Link to="/" className='text-light'>Home</Link>
                                <Link to="/about" className='text-light'>About</Link>
                                <Link to="/properties?TransactionType=For Lease" className='text-light'>For Lease</Link>
                                <Link to="/properties?TransactionType=For Sale" className='text-light'>For Sale</Link>
                                <Link to="/contact" className='text-light'>Contact</Link>
                                <Link to="/privacy-policy" className='text-light'>Privacy Policy</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xl-2 mb-5 mb-lg-0">
                            <h4 className='footer-heading'>Our Properties</h4>
                            <div className="d-flex flex-column gap-2">
                                {[...new Set(properties.map(item => item.PropertySubType))].map((type, index) => (
                                    <Link key={index} to={`/properties?PropertySubType=${type}`} className='text-light'>{type}</Link>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-4">
                            <h4 className='footer-heading'>Newsletter</h4>
                            <p className="mb-4">Do not miss to subscribe to our news feeds, kindly fill the form below</p>
                            <form onSubmit={handleSubmit} className="d-flex flex-row flex-lg-column flex-xl-row gap-3 align-items-start">
                                <div>
                                    <input type="email" name="email" value={formData?.email || ""} className="form-control mb-1" placeholder="Your Email" onChange={handleChange} required />
                                    {message && <span className='text-warning'>{message}</span>}
                                </div>
                                <button type="submit" disabled={loading} className="btn btn-primary" style={{paddingTop: '13.5px', paddingBottom: '13.5px'}}>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer