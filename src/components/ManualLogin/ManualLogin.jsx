/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToLocalStorage } from '../../utils/localStorage'
import GoogleLogin from '../GoogleLogin/GoogleLogin'
import axios from 'axios'

const ManualLogin = ({ setProfile = null, state = null, redirect = null }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ login: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = ({target}) => setFormData({ ...formData, [target.name]: target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const headers = { headers: { 'Content-Type': 'application/json' } };
            const response = await axios.post("https://api.teintoo.com/api.php/login", JSON.stringify(formData), headers);

            if (response.status === 200) {
                setMessage(null);
                saveToLocalStorage({profile: response.data.message});
                setProfile && setProfile(response.data.message);
                setFormData({});

                if (redirect) {
                    navigate(redirect);
                }
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                setMessage(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            {message ? (
                <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    {message}
                </div>
            ) : ""}

            <div className="mb-3">
                <input type="email" name="email" value={formData?.email || ""} className="form-control" placeholder="Your Email" onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <input type="password" name="password" value={formData?.password || ""} className="form-control" placeholder="Your Password" onChange={handleChange} required />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-100 mb-2">Login</button>
            <GoogleLogin setProfile={setProfile} className="w-100" />

            {state ? <p className="text-center">Not a member? <a href="#" onClick={() => state(false)}>Register</a></p> : ""}
        </form>
    )
}

export default ManualLogin