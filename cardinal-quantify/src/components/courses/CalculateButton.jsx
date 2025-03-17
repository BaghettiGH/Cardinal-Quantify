import React from 'react';
import "../../styles/calcpage.scss";

function CalculateButton({ assignments, setFinalGrade }) {  
    const getGradeFromPercentage = (finalGrade) => {
        if (finalGrade >= 96.00) return 1.00;
        if (finalGrade >= 91.00) return 1.25;
        if (finalGrade >= 86.00) return 1.50;
        if (finalGrade >= 81.00) return 1.75;
        if (finalGrade >= 76.00) return 2.00;
        if (finalGrade >= 72.00) return 2.25;
        if (finalGrade >= 68.00) return 2.50;
        if (finalGrade >= 64.00) return 2.75;
        if (finalGrade >= 60.00) return 3.00;
        return 5.00; // If below 60%
    };
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

        setFinalGrade(finalGrade);

        const finalGradeEquivalent = getGradeFromPercentage(finalGrade);
        setFinalGrade(finalGradeEquivalent);
    };

    return <div className = "calcButton"><button onClick={handleClick}>Calculate</button></div>;
}

export default CalculateButton;
