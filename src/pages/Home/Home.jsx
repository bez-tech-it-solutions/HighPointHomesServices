import { Link } from 'react-router-dom'
import Search from '../../components/Search/Search'
import PropertySlider from '../../components/PropertySlider/PropertySlider'
import './Home.css'

const Home = () => {
    return (
        <>
            {/* ========== Hero Section ========== */}
            <section className="home-hero py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="hero-content py-lg-5 px-3 px-xl-0">
                                <h1>Find Your Dream Home!</h1>
                                <p className='mb-4'>We make home-buying simple, guiding you to the perfect property for your lifestyle and budget.</p>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <Search />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== Top Selling Properties Section ========== */}
            <section className="selling-properties">
                <div className="container">
                    <h1 className="section-heading text-center mb-5">Top Properties for Sale</h1>
                    <PropertySlider variant={"For Sale"} slidesToShow={3} slidesToScroll={1} />
                </div>
            </section>

            {/* ========== Top Rental Properties Section ========== */}
            <section className="rental-properties">
                <div className="container">
                    <h1 className="section-heading text-center mb-5">Top Properties for Rent</h1>
                    <PropertySlider variant={"For Lease"} slidesToShow={3} slidesToScroll={1} />
                </div>
            </section>

            {/* ========== Why Choose Us Section ========== */}
            <section className="why-choose-us">
                <div className="container">
                    <div className="row align-items-center gx-lg-5">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <img src="/about.jpg" className='w-100 radius' alt="" />
                        </div>
                        <div className="col-lg-6">
                            <h1 className="section-heading mb-4">Why Choose Us?</h1>
                            <p className='mb-5'>At High Point Home Services, we specialize in turning dreams of home ownership into reality. With extensive expertise in the Canadian real estate market, we offer a personalized approach to help you find the perfect property that suits your lifestyle and budget. Our seamless home buying process ensures a stress free experience, supported by a trusted network of local professionals and a commitment to delivering exceptional service with transparency and integrity. Let us guide you every step of the way. Finding you a perfect space is our mission!.</p>
                            <Link to="/about" className="btn btn-primary">Read More</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home