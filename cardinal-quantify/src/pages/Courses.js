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
      <div className = "final-grade"><h3>{finalGrade !== null ? finalGrade.toFixed(2) : "--"}</h3></div>

      </div>      
      <div className = "task-bar">
        <ul className = "task-list">
          <li>Compute Grade</li>
          <li>Estimate Grade</li>
        </ul>
      </div>
      <GradeTable setFinalGrade = {setFinalGrade}/>
    </div>
    </div>
  );
};

export default Courses;