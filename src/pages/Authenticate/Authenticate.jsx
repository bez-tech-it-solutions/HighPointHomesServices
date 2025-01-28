/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadFromLocalStorage } from '../../utils/localStorage'
import ManualRegister from '../../components/ManualLogin/ManualRegister'
import ManualLogin from '../../components/ManualLogin/ManualLogin'

const Authenticate = () => {
    const [profile, setProfile] = useState(loadFromLocalStorage('profile', null));
    const [state, setState] = useState(false);

    return (
        <section className='authenticate py-3'>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-10 col-md-7 col-lg-4 mx-auto">
                        <Link to="/">
                            <img src="/logo.svg" width={100} className='d-block mx-auto mb-3' alt="" />
                        </Link>
                        {state ? (
                            <ManualLogin setProfile={setProfile} state={setState} redirect="/" />
                        ) : (
                            <ManualRegister setProfile={setProfile} state={setState} redirect="/" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Authenticate