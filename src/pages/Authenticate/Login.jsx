import { Link } from 'react-router-dom'
import ManualLogin from '../../components/ManualLogin/ManualLogin'

const Login = () => {
    return (
        <section className='authenticate py-3'>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-10 col-md-7 col-lg-5 col-xxl-4 mx-auto">
                        <Link to="/">
                            <img src="/logo.svg" width={100} className='d-block mx-auto mb-3' alt="" />
                        </Link>

                        <ManualLogin redirect="/" />

                        <div className="d-flex justify-content-between mt-3">
                            <Link to="/auth/register">Register Now</Link>
                            <Link to="/auth/forget-password">Forget Password</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login