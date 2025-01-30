/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { loadFromLocalStorage, deleteFromLocalStorage } from '../../utils/localStorage'
import LoginModal from '../../components/LoginModal/LoginModal'

import './Navbar.css'

const Navbar = () => {
    const location = useLocation();

    const [profile, setProfile] = useState(loadFromLocalStorage('profile', null));
    const [isScrolled, setIsScrolled] = useState(false);

    const getActiveClass = (transactionType) => {
        const params = new URLSearchParams(location.search);
        return params.get("TransactionType") === transactionType ? "active" : "";
    };

    useEffect(() => {
        const handleScroll = () => {
            (window.scrollY > 100) ? setIsScrolled(true) : setIsScrolled(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const logOut = () => {
        googleLogout();
        deleteFromLocalStorage('profile');
        setProfile(null);
    };


    return (
        <>
            <nav className={`navbar navbar-expand-md fixed-top navbar-light bg-white ${isScrolled ? "scrolled" : ""}`}>
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src="/logo-black.webp" width={100} alt="" />
                    </Link>
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId"
                        aria-controls="collapsibleNavId"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/properties" className="nav-link">Properties</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink to="/properties?TransactionType=For Lease" className={() => `${getActiveClass("For Lease")} nav-link`}>For Lease</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/properties?TransactionType=For Sale" className={() => `${getActiveClass("For Sale")} nav-link`}>For Sale</NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                            </li>
                        </ul>
                        {profile ? (
                            <div className="dropdown">
                                <button
                                    className="btn dropdown-toggle d-flex align-items-center gap-2 p-1 border-0"
                                    type="button"
                                    id="triggerId"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img src={profile?.picture || "/default.jpg"} width={35} height={35} className='rounded' alt="user image" />
                                    <span>{profile?.name}</span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="triggerId">
                                    <a className="dropdown-item" href="#" onClick={logOut}>Logout</a>
                                </div>
                            </div>
                        ) : (
                            <Link to="/auth/register" className="btn btn-primary my-2 my-sm-0">Register</Link>
                        )}
                    </div>
                </div>
            </nav>

            <LoginModal setProfile={setProfile} />
        </>
    )
}

export default Navbar