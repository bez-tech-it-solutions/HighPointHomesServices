import { Link } from 'react-router-dom'
import ManualRegister from '../../components/ManualLogin/ManualRegister'

const Register = () => {
    
    return (
        <section className='authenticate py-3'>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-10 col-md-7 col-lg-5 col-xxl-4 mx-auto">
                        <Link to="/">
                            <img src="/logo-black.webp" width={100} className='d-block mx-auto mb-3' alt="" />
                        </Link>

                        <ManualRegister redirect="/" />

                        <div className="d-flex justify-content-between mt-3">
                            <Link to="/auth/login">Login</Link>
                            <Link to="/">Back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register