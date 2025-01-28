import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const ForgetPassword = () => {
    const [formData, setFormData] = useState({ forgetPassword: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const headers = { headers: { 'Content-Type': 'application/json' } };
            const response = await axios.post("https://api.teintoo.com/api.php/forget-password", JSON.stringify(formData), headers);

            if (response.status === 200) {
                setMessage(response.data.message);
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                setMessage(error.response.data.message);
            }
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className='authenticate py-3'>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-10 col-md-7 col-lg-4 mx-auto">
                        <Link to="/">
                            <img src="/logo.svg" width={100} className='d-block mx-auto mb-3' alt="" />
                        </Link>

                        <form onSubmit={handleSubmit}>
                            {message ? (
                                <div className="alert alert-info alert-dismissible fade show mb-3" role="alert">
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    {message}
                                </div>
                            ) : ""}

                            <div className="mb-3">
                                <input type="email" name="email" value={formData?.email || ""} className="form-control" placeholder="Your Email" onChange={handleChange} required />
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary w-100">Send Link</button>
                        </form>

                        <p className="text-center mt-3">Return to <Link to="/auth/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgetPassword