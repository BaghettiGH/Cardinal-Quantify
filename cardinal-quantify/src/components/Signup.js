import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from './firebase';
import {setDoc, doc} from 'firebase/firestore';
import Logo from '../Assets/secondary.png';
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import "../styles/Signup.css";
function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = /.{8,}/; // Minimum 8 characters
        const lowerCase = /[a-z]/; // At least one lowercase letter
        const upperCase = /[A-Z]/; // At least one uppercase letter
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
    
        if (!minLength.test(password)) {
          setError("Password must be at least 8 characters long.");
          return false;
        }
        if (!lowerCase.test(password)) {
          setError("Password must contain at least one lowercase letter.");
          return false;
        }
        if (!upperCase.test(password)) {
          setError("Password must contain at least one uppercase letter.");
          return false;
        }
        if (!specialChar.test(password)) {
          setError("Password must contain at least one special character.");
          return false;
        }
        return true;
      };
    

    const handleRegister =async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
        }

        if (!validatePassword(password)) {
        return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if(user){
                await setDoc(doc(db, "Users", user.uid), {
                email:user.email,
                firstName: fname,
                lastName: lname,
            });
            }
            console.log("User is registered successfully");
            navigate("/login");
        } catch (error) {
            console.log(error.message);
            if (error.code === "auth/email-already-in-use") {
                setError("Email is already in use.");
              } else {
                console.log(error.message);
              }
        }
    }

  return (
    <div className ='register-wrapper'>
        <div className='wrapper'>
            <img src={Logo} alt= "Logo"/>
            {error && <div className="error-message">{error}</div>}
            <div className='form-wrapper'>
                <form onSubmit={handleRegister}>
                    

                        <div className='input-group'>
                        
                            <input 
                                type='text' 
                                value={fname} 
                                onChange={(e) => setFname(e.target.value)} 
                                required/>
                            <label>First name</label>
                        </div>

                        <div className='input-group'>
                        
                            <input 
                                type='text' 
                                value={lname} 
                                onChange={(e) => setLname(e.target.value)} 
                                required/>
                            <label>Last name</label>
                        </div>

                        <div className='input-group'>
                        
                            <input 
                                type='email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required/>
                            <label>Email address</label>
                        </div>

                        <div className='input-group'>
                        
                            <input 
                                type={visible ? "text" : "password"}
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required/>
                                 <div className='p-2 text-white fs-6' onClick={() => setVisible(!visible)}>
                                    {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                </div>
                            <label>Password</label>
                        </div>
                        <div className='input-group'>
                        
                            <input 
                                type={visible ? "text" : "password"}
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required/>
                                  <div className='p-2 text-white fs-6' onClick={() => setVisible(!visible)}>
                                        {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                    </div>
                            <label>Confirm Password</label>
                        </div>


                        <button type="submit" class="button">Sign Up</button>
                        <div className='signUp-link'>
                            <p>
                            Already registered? <a href="/login">Login</a> </p>
                        </div>
                    
                    
                </form>
            </div>
         </div> 
    </div>
  )
}

export default Signup