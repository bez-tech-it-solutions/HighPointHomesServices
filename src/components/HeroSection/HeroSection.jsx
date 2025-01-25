/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { LuChevronRight } from 'react-icons/lu'
import './HeroSection.css'

const HeroSection = ({ title }) => {
    return (
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-xl-6 mx-auto">
                        <div className="hero-content text-center">
                            <h1>{title}</h1>
                            <p className='mb-4'>
                                <Link to="/">Home</Link>
                                <LuChevronRight />
                                <span>{title}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection