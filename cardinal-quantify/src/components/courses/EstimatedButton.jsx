import React from 'react';
import "../../styles/calcpage.scss";

function EstimaeButton({ assignments, setFinalGrade }) {
  const handleClick = () => {
    let totalGradeWeight = assignments.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
    if (totalGradeWeight !== 100) {
      alert("Total Grade Weight must equal 100. TotalGrade: " + totalGradeWeight);
      return;
    }

    // Calculate the required grade for each assignment to achieve a 70% passing grade
    const requiredGrade = assignments.map((item) => {
      const weight = parseFloat(item.weight) / 100;
      const totalGrade = parseFloat(item.totalGrade);
      const required = (0.7 - (item.grade ? parseFloat(item.grade) * weight : 0)) / weight;
      return {
        ...item,
        requiredGrade: required > totalGrade ? totalGrade : required,
      };
    });

    // Update the assignments with the required grades
    setFinalGrade(requiredGrade);
  };

  return (
    <div className="calcButton">
      <button onClick={handleClick}>Estimate Required Grades</button>
    </div>
  );
}

export default EstimaeButton;