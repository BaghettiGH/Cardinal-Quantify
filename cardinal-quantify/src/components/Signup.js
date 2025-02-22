import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from './firebase';
import {setDoc, doc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import "../styles/Signup.css";
import Logo from '../Assets/secondary.png';
import { useNavigate } from 'react-router-dom';
function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const navigate = useNavigate();

    const handleRegister =async (e) => {
        e.preventDefault();
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
            toast.success("User Registered Successfully!", {
                position: "top-center",
            });
            navigate("/login");
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
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required/>
             <label>Password</label>
        </div>
        <button type="submit">Sign Up</button>
        <div className='signUp-link'>
            <p>
            Already registered? <a href="/login">Login</a> </p>
        </div>
     
     
</form>
</div>
</div> 
  )
}

export default Signup