import React, { useState, useEffect, use } from 'react';
import { FaArrowRight } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";
import "../styles/feedback.scss";

const Feedback = () => {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "Anonymous");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter a feedback message.");
      return;
    }

    try {
      await addDoc(collection(db, "Feedback"), {
        name: userName,
        message: message,
        timestamp: new Date()
      });

      console.log("Feedback submitted:", { userName, message });
      setSubmitted(true);
      setMessage(""); 
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
        <button className = "feedback-submit" onClick = {handleSubmit} >Submit <FaArrowRight /></button>

      </div>
    </div>
  );
};
export default Feedback;