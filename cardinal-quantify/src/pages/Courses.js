import React, { useState } from 'react';
import '../styles/courses.scss';
import GradeTable from '../components/courses/GradeTable';

const Courses = () => {
  console.log("Courses component loaded");
  const [finalGrade, setFinalGrade] = useState(null);

  return (
    <div className="courses-container">
      <div className="main-content">
      <div className = "header">
      <h1>Courses</h1>
      <h3>{finalGrade !== null ? finalGrade.toFixed(2) : "-"}</h3>

      </div>      
      <div style={{border: "1px solid black", padding: "10px"}}>
        Compute Grade
      </div>
      <GradeTable setFinalGrade = {setFinalGrade}/>
    </div>
    </div>
  );
};

export default Courses;