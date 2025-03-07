import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from './firebase';
import "../styles/Login.css";
import Logo from '../Assets/secondary.png';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            if (user.emailVerified) {
                console.log("User logged in successfully");
                window.location.href = "/dashboard"; // Redirect after login
            } else {
                setError("Please verify your email before logging in.");
                await auth.signOut(); // Sign out unverified users immediately
            }
        } catch (error) {
            console.log(error.code);
            setFailedAttempts(failedAttempts + 1); // Increment failed attempts
    
            if (error.code === "auth/invalid-credential") {
                setError("The username or password you typed is incorrect. Please try again.");
            } else if (error.code === "auth/user-not-found") {
                setError("No account found with this email.");
            } else if (error.code === "auth/too-many-requests") {
                setError("An error occurred. Please try again later.");
            }
    
            // Automatically prompt password reset email after 3 failed attempts
            if (failedAttempts === 2) {
                sendPasswordResetEmail(auth, email)
                    .then(() => {
                        setError("Too many failed attempts. Password reset email sent.");
                    })
                    .catch((error) => {
                        console.log(error.message);
                        setError("Failed to send password reset email. Please try again.");
                    });
            }
        }
    };
    

    return (
        <div className='login-wrapper'>
            <div className='wrapper'>
                <img src={Logo} alt="Logo" />
                {error && <div className="error-message">{error}</div>}
                <div className='form-wrapper sign in'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <label>Email address</label>
                        </div>
                        <div className='input-group'>
                            <input
                                type={visible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <div className='p-2 text-white fs-6' onClick={() => setVisible(!visible)}>
                                {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </div>
                            <label>Password</label>
                        </div>
                        <button type="submit" className="button">Login</button>
                        <div className='logIn-link'>
                            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
