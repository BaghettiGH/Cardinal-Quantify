import React, { useState } from 'react';
import GradeTable from '../components/courses/GradeTable';
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
    <div>
     
      {submitted ? (
        <p>Thank you for your feedback, {name}!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};
 
export default Feedback;