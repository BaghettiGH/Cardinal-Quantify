import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/calcpage.scss';
import GradeTable from '../components/courses/GradeTable';
import { Link } from 'react-router-dom';

const Courses = () => {
  const location = useLocation();
  const isEstimateMode = location.pathname.includes('estimate-grade');

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
          <li><Link to = "/compute-grade">Compute Grade</Link></li>
          <li><Link to = "/estimate-grade">Estimate Grade</Link></li>
        </ul>

        
      </div>
      <GradeTable setFinalGrade={setFinalGrade} mode={isEstimateMode ? 'estimate' : 'compute'} />

    </div>
    </div>
  );
};

export default Courses;
