import React from 'react';
import "../../styles/estgrade.scss";

function EstimateButton({ assignments, setFinalGrade }) {  
    const handleClick = () => {
       let totalWeight =0;
       let currentGrade =0;
       let missingWeight =0;

       assignments.forEach(item =>{
            const numGrade = parseFloat(item.grade);
            const numTotalGrade = parseFloat(item.totalGrade);
            const numWeight = parseFloat(item.weight);

            if(!isNaN(numWeight)) totalWeight += numWeight;
            if(!isNaN(numGrade)&& !isNaN(numTotalGrade)&& numTotalGrade > 0 && !isNaN(numWeight)){
                currentGrade += (numGrade / numTotalGrade) * numWeight;
            } else if(!isNaN(numWeight)){
                missingWeight += numWeight;
            }
       });
    if (totalWeight !== 100){
        alert("Total Grade Weight must equal 100. Current Total: " + totalWeight);
        return;
    }

    if (missingWeight === 0){
        setFinalGrade(currentGrade);
        alert("Final Grade: " + currentGrade.toFixed(2));
        return;
    }

};

    return <div className = "calcButton"><button onClick={handleClick}>Estimate</button></div>;
}

export default EstimateButton;
