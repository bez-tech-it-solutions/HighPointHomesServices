/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToLocalStorage } from '../../utils/localStorage'
import GoogleLogin from '../GoogleLogin/GoogleLogin'
import axios from 'axios'

const ManualLogin = ({ setProfile, state, redirect = null }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ login: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = ({target}) => setFormData({ ...formData, [target.name]: target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("https://api.teintoo.com/api.php/login", JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.status === 200) {
                setError("");
                saveToLocalStorage({profile: response.data.message});
                setProfile(response.data.message);
                setFormData({});

                if (redirect) {
                    navigate(redirect);
                }
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            {error ? (
                <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    {error}
                </div>
            ) : ""}
            
            <div className="mb-3">
                <input type="email" name="email" value={formData?.email || ""} className="form-control" placeholder="Your Email" onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <input type="password" name="password" value={formData?.password || ""} className="form-control" placeholder="Your Password" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <button type="submit" disabled={loading} className="btn btn-primary w-100 mb-1 mb-sm-2">Login</button>
                <GoogleLogin setProfile={setProfile} className="w-100" />
            </div>
            <p className="text-center">Not a member? <a href="#" onClick={() => state(false)}>Register</a></p>
        </form>
    )
}

export default ManualLogin