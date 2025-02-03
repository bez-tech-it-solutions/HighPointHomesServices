import { Helmet } from "react-helmet-async";
import HeroSection from '../components/HeroSection/HeroSection'

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | 4 Your House Real Estate Canada</title>
                <meta name="description" content="Review 4 Your House's Privacy Policy to understand how we protect your personal information in our Canadian real estate services." />
            </Helmet>

            <HeroSection title="Privacy Policy" />

            <section className='text-dark'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className='mb-5'><strong>4 Your House</strong>("we," "our," or "us") values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the information you provide while using our website. By accessing or using our website, you agree to the terms outlined in this Privacy Policy.</p>
                            <h4 className='mb-4'>1. Information We Collect</h4>
                            <p className='mb-3'>We may collect the following types of information:</p>
                            <ol className='mb-5'>
                                <li>Personal Information
                                    <ul>
                                        <li>Name, email address, phone number, and other contact details when you:
                                            <ul>
                                                <li>Register on our website</li>
                                                <li>Submit a contact form</li>
                                                <li>Subscribe to our newsletter</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>Non-Personal Information
                                    <ul>
                                        <li>IP address, browser type, operating system, and other technical details.</li>
                                        <li>Usage data, including pages visited, time spent on the website, and actions performed.</li>
                                    </ul>
                                </li>
                                <li>Cookies and Tracking Technologies
                                    <ul>
                                        <li>We use cookies and similar tracking technologies to enhance user experience and analyze website performance.</li>
                                    </ul>
                                </li>
                            </ol>

                            <h4 className='mb-4'>2. How We Use Your Information</h4>
                            <p className='mb-3'>We use the collected information for the following purposes:</p>
                            <ul className='mb-5'>
                                <li>To process your requests and inquiries.</li>
                                <li>To improve and personalize your user experience.</li>
                                <li>To communicate updates, promotional offers, and news related to our services.</li>
                                <li>To analyze website performance and monitor trends.</li>
                                <li>To ensure website security and prevent fraudulent activities.</li>
                            </ul>

                            <h4 className='mb-4'>3. How We Share Your Information</h4>
                            <p className='mb-3'>We do not sell, trade, or rent your personal information to third parties. However, we may share your data with:</p>
                            <ul className='mb-5'>
                                <li><strong>Service Providers:</strong> Third-party vendors who help us operate the website or provide services on our behalf.</li>
                                <li><strong>Legal Compliance:</strong> Authorities, if required by law or to protect our legal rights.</li>
                            </ul>

                            <h4 className='mb-4'>4. Data Security</h4>
                            <p className='mb-3'>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no data transmission over the internet can be guaranteed as 100% secure.</p>

                            <h4 className='mb-4'>5. Your Rights</h4>
                            <p className='mb-3'>You have the following rights regarding your personal data:</p>
                            <ul className='mb-3'>
                                <li><strong>Access:</strong> Request a copy of your personal information.</li>
                                <li><strong>Correction:</strong> Update or correct inaccuracies in your data.</li>
                                <li><strong>Deletion:</strong> Request the deletion of your personal data, subject to legal or contractual obligations.</li>
                                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails or opt out of cookies.</li>
                            </ul>
                            <p className='mb-5'>To exercise these rights, contact us at <strong>info@4yourhouse.ca</strong></p>

                            <h4 className='mb-4'>6. Cookies Policy</h4>
                            <p className='mb-3'>Our website uses cookies to:</p>
                            <ul className='mb-3'>
                                <li>Track website traffic and usage.</li>
                                <li>Remember user preferences for a better browsing experience.</li>
                            </ul>
                            <p className='mb-5'>You can control cookies through your browser settings.</p>

                            <h4 className='mb-4'>7. Third-Party Links</h4>
                            <p className='mb-5'>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.</p>

                            <h4 className='mb-4'>8. Children's Privacy</h4>
                            <p className='mb-5'>Our website is not intended for children under the age of 13. We do not knowingly collect personal data from children.</p>

                            <h4 className='mb-4'>9. Changes to This Privacy Policy</h4>
                            <p className='mb-5'>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with the updated <strong>Effective Date.</strong></p>

                            <h4 className='mb-4'>10. Contact Us</h4>
                            <p className='mb-4'>If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
                            <p className='mb-2'><strong>Email:</strong> info@4yourhouse.ca</p>
                            <p><strong>Address:</strong> 3119 SHEPPARD AVE EAST #101, TORONTO, Ontario, M1T3J8</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PrivacyPolicy