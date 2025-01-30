import { Link } from 'react-router-dom'
import HeroSection from '../../components/HeroSection/HeroSection'
import './About.css'

const About = () => {
    return (
        <main className='about'>
            <HeroSection title="About" />

            <section className='about-inner'>
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <h3>Selling your home? <span>Choose us.</span></h3>
                            <p>At 4 Your House, we specialize in turning dreams of homeownership into reality. With extensive expertise in the Canadian real estate market, we are dedicated to guiding our clients through every step of their property journey, from the initial search to the final closing. We understand that finding the perfect property is not just about bricks and mortar - it is about creating a space where you can build your future, live your lifestyle, and make lasting memories. <br/><br/> Our team takes pride in offering a personalized approach that goes beyond traditional real estate services. We take the time to truly understand your needs, preferences, and goals, ensuring that each recommendation aligns with your vision. Whether you are a first-time homebuyer, a seasoned investor, or looking for your forever home, we are here to provide expert advice and tailored solutions that suit your lifestyle and budget. <br/><br/> We have built a trusted network of local professionals, including mortgage brokers, legal advisors, home inspectors, and contractors, to ensure a seamless home-buying process from start to finish. Our commitment to transparency, integrity, and exceptional service sets us apart, making us a trusted partner in your real estate journey. <br/><br/> At 4 Your House, we do not just help you find a house - we help you find a place to call home. Your satisfaction is our top priority, and your trust is our greatest reward. Let us guide you every step of the way, turning your dreams into reality, one perfect space at a time. <br/><br/> Finding you the perfect place to live is not just our job - it is our mission, our passion, and our promise to you.</p>
                            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 mb-5 mb-lg-0">
                            <img src="/about.jpg" className='w-100' alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default About