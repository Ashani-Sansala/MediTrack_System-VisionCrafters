import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SecureLS from 'secure-ls';
import axios from "axios";
import clip from "./loginAssets/clip.mp4";
import logo from "./loginAssets/logo.png";
import encrypt from "../../utils/Encryption.jsx";
import "./Login.scss";

const api_url = import.meta.env.VITE_API_URL;

const ls = new SecureLS({ encodingType: 'aes' });

export const Login = () => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        const encryptedUsername = encrypt(username);
        const encryptedPassword = encrypt(password);

        try {
            const response = await axios.post(`${api_url}/login/authenticate`, {
                username: encryptedUsername.value,
                password: encryptedPassword.value,
                unameIv: encryptedUsername.iv,
                passIv: encryptedPassword.iv
            });

            const data = response.data;

            if (data.success) {
                ls.set('userID', data.userID);
                ls.set('userName', data.userName);
                ls.set('pID', data.pID);
                window.location.href = "/dashboard";
            } else {
                setError(data.message);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError('Invalid request or missing required fields.');
                } else if (error.response.status === 401) {
                    setError('Invalid password!');
                } else if (error.response.status === 404) {
                    setError('Invalid username!');
                } else {
                    setError('Something went wrong. Please try again!');
                }
            } else {
                setError('Something went wrong. Please try again!');
            }
        }
    };

    return (
        <div className="loginPage flex">
            <div className="container flex">
                <div className="videoDiv">
                    <video src={clip} autoPlay muted loop></video>
                    <div className="textDiv">
                        <h2 className="title">
                            Empowering healthcare with innovative system solutions.
                        </h2>
                        <p>Track, locate, and optimize hospital assets.</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Start tracking hospital assets!</span>
                    </div>
                </div>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Welcome back!</h3>
                    </div>
                    <form action="" className="form grid" onSubmit={handleSubmit}>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id="username" placeholder="Enter Username" required />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter Password"
                                    required
                                />
                                <div onClick={togglePasswordVisibility} className="password-toggle">
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </div>
                            </div>
                        </div>
                        <div className="error">{error}</div>
                        <button type="submit" className="btn flex">
                            <span>Login </span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};