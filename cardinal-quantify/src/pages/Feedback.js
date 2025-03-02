import React, { useState, useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/feedback.scss";
import { IoMdClose } from "react-icons/io";

const Feedback = () => {
  const [userDetail, setUserDetail] = useState('Anonymous');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetail(docSnap.data());
        console.log(docSnap.data());
      }
    });
  };

      useEffect(() => {
        fetchUserData();
      }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter a feedback message.");
      return;
    }

    try {
      await addDoc(collection(db, "Feedback"), {
        name: userDetail.firstName + " " + userDetail.lastName,
        message: message,
        timestamp: new Date()
      });

      // console.log("Feedback submitted:", { userDetail.firstName, message });
      setSubmitted(true);
      setMessage(""); 
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
 
  return (
    <div className = "feedback-container">
      <div className = "feedback-form">
      <h3>Give us a Feedback!</h3>
      <div className = "feedback-input-div">
      <input 
        className = "feedback-input"
        value = {message}
        onChange={(e) => setMessage(e.target.value)}
        />
        </div>
        <button className = "feedback-submit" 
        onClick = {handleSubmit} >
          Submit <FaArrowRight />
        </button>
      </div>
      {showConfirmation && (
        <div className = {"overlay show" }>
          <div className = "overlay-content">
          <button className = "close-button"
        onClick = {() => setShowConfirmation(false)}>
          <IoMdClose />
        </button>
          <div className = "check-icon-container">
          <FaCheckCircle className = "check-icon"/>
          </div>
        <h2>Thank you!</h2>
        <h4>We appreciate your input and are committed to improving our services based on your suggestions.</h4>

        </div>
        </div>
      )}
    </div>
  );
};
export default Feedback;