import React, { useState } from 'react';
import '../styles/EmailVerification.css';
import Logo from '../Assets/secondary.png';
import { HiOutlineMailOpen } from "react-icons/hi";
import { toast } from 'react-toastify';
import {sendEmailVerification } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';


const VerifyEmail = () => {

    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate(); 

    const resendVerificationEmail = async () => {
      if (isResending) return;
      setIsResending(true);
      try {
        if (auth.currentUser) {
          await sendEmailVerification(auth.currentUser);
          toast.success("Verification email sent again. Please check your inbox!");
        } else {
          toast.error("Unable to resend email. Please try logging in again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while resending the email.");
      } finally {
        setTimeout(() => setIsResending(false), 30000); 
      }
    };
    const handleContinue = () => {
        navigate('/login'); 
      };
  return (
    <div className='verify-email-content-wrapper'>
    <img className='logo-app' src={Logo} alt= "Logo"/>
    <div className='verify-email-container'> 
    <HiOutlineMailOpen className='icon-mail' size="100px"/>
    <p className='header-content'>Verify your email address</p>
    <p className='message-content'>A verification email has been sent to your email. Please check your email and click the link provided in the email to complete your account registration</p>
    <p className='alternate-content'>Didn't get an email? <a onClick={resendVerificationEmail} className="resend-link">Resend</a></p>
    <button className='continue-to-login' onClick={handleContinue}> Continue to Login </button>
    </div>
    </div>
  )
}

export default VerifyEmail