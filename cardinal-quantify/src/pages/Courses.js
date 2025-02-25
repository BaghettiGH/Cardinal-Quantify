import React, { useState } from 'react';
import '../styles/courses.scss';
import GradeTable from '../components/courses/GradeTable';

const Courses = () => {
  console.log("Courses component loaded");
  const [finalGrade, setFinalGrade] = useState(null);

  const getBackgroundColor = () =>{
    if (finalGrade === null) return "#CDCCCC";
    if (finalGrade >= 95) return "#39E379";
    if (finalGrade >= 85) return "#CDEE4B";
    if (finalGrade >= 70) return "#FF9600";
    return "#FF3B30";

  }


  return (
    <div className="courses-container">
      <div className="main-content">
      <div className = "header">
      <h1>Courses</h1>
      <div className = "final-grade" style = {{ backgroundColor: getBackgroundColor() }}>
        <h3>{finalGrade !== null ? finalGrade.toFixed(2) : "--"}</h3></div>
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