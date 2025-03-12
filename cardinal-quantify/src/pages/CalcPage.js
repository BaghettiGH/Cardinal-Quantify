import React, { useState } from 'react';
import '../styles/calcpage.scss';
import GradeTable from '../components/courses/GradeTable';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

const Courses = () => {
  console.log("Courses component loaded");
  const [finalGrade, setFinalGrade] = useState(null);
  const location = useLocation();
  const mode = location.pathname === '/estimate-grade' ? 'estimate' : 'compute';

  const getBackgroundColor = () => {
    if (finalGrade === null) return "#CDCCCC";
    if (finalGrade >= 95) return "#39E379";
    if (finalGrade >= 85) return "#CDEE4B";
    if (finalGrade >= 70) return "#FF9600";
    return "#FF3B30";
  };

  return (
    <div className="courses-container">
      <div className="main-content">
        <div className="header">
          <h1>Courses</h1>
          <div className="final-grade" style={{ backgroundColor: getBackgroundColor() }}>
            <h3>{finalGrade !== null ? finalGrade.toFixed(2) : "--"}</h3>
          </div>
        </div>
        <Navbar />
        <GradeTable setFinalGrade={setFinalGrade} mode={mode} />
      </div>
    </div>
  );
};

export default Courses;
