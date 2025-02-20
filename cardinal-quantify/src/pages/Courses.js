import React from 'react';
import '../styles/courses.scss';
import GradeTable from '../components/courses/GradeTable';

const Courses = () => {
  console.log("Courses component loaded");
  return (
    <div className="courses-container">
      <div className="main-content">
      <h1>Courses</h1>        
      <div style={{border: "1px solid black", padding: "10px"}}>
        Test div
      </div>
      <GradeTable />
    </div>
    </div>
  );
};

export default Courses;