/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { getUserIP } from './utils/getUserIP'

const Layout = ({ children }) => {
    useEffect(() => {
        const fetchIP = async () => {
            try {
                const data = await getUserIP();
                await fetch("https://api.teintoo.com/api.php/ip", {
                    method: "POST",
                    body: JSON.stringify({ ip: data.ip }),
                });
            } catch (error) {
                console.error("Error fetching IP:", error);
            }
        };

        fetchIP();
    }, []);


    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout