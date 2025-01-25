/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useGoogleLogin } from "@react-oauth/google"
import { FaGoogle } from 'react-icons/fa6'
import { saveToLocalStorage } from "../../utils/localStorage";
import axios from 'axios'

const GoogleLogin = ({ setProfile, className }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getProfile();
    }, [user]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error)
    });

    const getProfile = async () => {
        if (!user) return;

        try {
            const options = { headers: { Authorization: `Bearer ${user.access_token}`, Accept: 'application/json' } };
            const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, options);
            if (response && response.data) {
                saveToLocalStorage({ profile: response.data })
                setProfile(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <button className={`btn btn-primary my-2 my-sm-0 d-flex justify-content-center align-items-center gap-2 ${className}`} onClick={login}>
            <FaGoogle size={20} /> Login with Google
        </button>
    )
}

export default GoogleLogin