import React, { useState } from 'react';
import '../styles/calcpage.scss';
import GradeTable from '../components/courses/GradeTable';
import { NavLink } from 'react-router-dom';

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
          <div className = "compute-grade-div">
          <li><NavLink to = "/compute-grade" activeClassName="active-link">Compute Grade</NavLink></li>
          </div>
          <div className = "estimate-grade-div">
          <li><NavLink to = "/estimate-grade" activeClassName="active-link">Estimate Grade</NavLink></li>
          </div>
        </ul>
      </div>
      <GradeTable setFinalGrade = {setFinalGrade}/>
    </div>
    </div>
  );
};

export default Courses;