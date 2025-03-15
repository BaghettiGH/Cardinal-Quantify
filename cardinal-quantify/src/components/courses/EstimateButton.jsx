import React from 'react';
import "../../styles/estgrade.scss";

function EstimateButton({ assignments, desiredGrade,setNeededGrades }) {  
    const handleClick = () => {
       let totalWeight =0;
       let currentGrade =0;
       let missingWeight =0;
       let missingAssignments =[];

       console.log("Recieve desiredGrade:",desiredGrade);
           if (desiredGrade === "" || isNaN(parseFloat(desiredGrade))) {
        alert("Invalid desired grade input.");
        return;
    }



       assignments.forEach(item =>{
            const numGrade = parseFloat(item.grade);
            const numTotalGrade = parseFloat(item.totalGrade);
            const numWeight = parseFloat(item.weight);

            if(!isNaN(numWeight)) totalWeight += numWeight;
            if(!isNaN(numGrade)&& !isNaN(numTotalGrade)&& numTotalGrade > 0 && !isNaN(numWeight)){
                currentGrade += (numGrade / numTotalGrade) * numWeight;
            } else if(!isNaN(numWeight)){
                missingWeight += numWeight;
                missingAssignments.push(item);
            }
       });
    if (totalWeight !== 100){
        alert("Total Grade Weight must equal 100. Current Total: " + totalWeight);
        return;
    }

    if (missingWeight === 0){
        alert("Final Grade: " + currentGrade.toFixed(2));
        setNeededGrades({});
        return;
    }
    const numDesiredGrade = parseFloat(desiredGrade);
    let neededGrades = {};
    let remainingGrade = (desiredGrade - currentGrade) / missingWeight * 100;
    console.log("Parsed desiredGrade:", numDesiredGrade);


    // if(isNaN(remainingGrade) || !isFinite(remainingGrade)){
    //     alert("Error calculating required grades.");
    //     return;
    // }


    missingAssignments.forEach((assignment) =>{
        neededGrades[assignment.id] = remainingGrade.toFixed(2) + "%";
    });
    setNeededGrades(neededGrades);
};

    return <div className = "calcButton"><button onClick={handleClick}>Estimate</button></div>;
}

export default EstimateButton;
