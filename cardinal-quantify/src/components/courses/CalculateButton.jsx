import React from 'react';
import "../../styles/courses.scss";

function CalculateButton({ assignments, setFinalGrade }) {  // ✅ Accept setFinalGrade
    const handleClick = () => {
        let totalGradeWeight = assignments.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
        if (totalGradeWeight !== 100) {
            alert("Total Grade Weight must equal 100. TotalGrade: " + totalGradeWeight);
            return;
        }

        let finalGrade = assignments.reduce((sum, item) => {
            const numGrade = parseFloat(item.grade);
            const numTotalGrade = parseFloat(item.totalGrade);
            const numWeight = parseFloat(item.weight);

            if (isNaN(numGrade) || isNaN(numTotalGrade) || isNaN(numWeight) || numTotalGrade === 0) {
                return sum;
            }
            return sum + (numGrade / numTotalGrade) * numWeight;
        }, 0);

        setFinalGrade(finalGrade);  // ✅ Updates Courses.js
    };

    return <button onClick={handleClick}>Calculate</button>;
}

export default CalculateButton;
