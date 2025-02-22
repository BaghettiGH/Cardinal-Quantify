import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from './firebase';
import "../styles/Login.css";
import Logo from '../Assets/secondary.png';
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            toast.success(error.message, {
                            position: "bottom-center",
                        });
        }
    }
  return (

       
        <div className='wrapper'>
        <img src={Logo} alt= "Logo"/>
            <div className='form-wrapper sign in'>
            <form onSubmit={handleSubmit}>
                
                    <div className='input-group'>
                        
                        <input 
                            type='email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required />
                        <label>Email address</label>
                    </div>
                    <div className='input-group'>
                        
                        <input 
                            type='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label>Password</label>
                    </div>
                    
                        <button type="submit"> Login </button>
                    <div className='logIn-link'>
                    <p>Don't have an account? <a href="/signup">Sign Up</a> 
                
                </p>
                </div>
            </form>
            </div>
        </div>

  )
}

export default Login