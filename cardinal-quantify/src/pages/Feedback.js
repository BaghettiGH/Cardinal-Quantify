import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
// import { db } from "./firebase";
import "../styles/feedback.scss";

const Feedback = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { name, message });
    setSubmitted(true);
  };
 
  return (
    <div className = "feedback-container">
      <div className = "feedback-form">
      <h3>Give us a Feedback!</h3>
      <div className = "feedback-input-div">
      <input 
        className = "feedback-input"
        />
        </div>
        <button className = "feedback-submit">Submit</button>
      </div>
    </div>
  );
};
export default Feedback;