import React from 'react'
import GradeCalculator from '../components/courses/GradeCalculator';
import '../styles/courses.scss';
import GradeTable from '../components/courses/GradeTable';

const Courses = () => {
  return (
    <div className="courses-container">
      <div className="main-content">
        <h1>Courses</h1>
        <GradeTable />
      </div>
    </div>
  );
}

export default Courses;