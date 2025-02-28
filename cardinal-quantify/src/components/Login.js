import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            window.location.href="/dashboard";
            toast.success("User Logged in Successfully!", {
                            position: "top-center",
                        });
            
        } catch (error) {
            console.log(error.message);
            setError("The username or password you typed is incorrect. Please try again.");
        }
    }
  return (

    <div className='login-wrapper'>   
        <div className='wrapper'>
        <img src={Logo} alt= "Logo"/>
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
                            <div className='p-2 text-white fs-6' onClick={()=>setVisible(!visible)}>
                        {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </div>
                        <label>Password</label>
                    </div>
                    
                        <button type="submit" class="button"> Login </button>
                    <div className='logIn-link'>
                    <p>Don't have an account? <a href="/signup">Sign Up</a> 
                
                </p>
                </div>
            </form>
            </div>
        </div>
    </div> 
  )
}

export default Login