import React, {useState} from 'react';
import "../../styles/courses.scss";

function CalculateButton({grade1, totalGrade1, weight1, grade2, totalGrade2, weight2, grade3, totalGrade3, weight3}) {
    const handleClick = () => {
        const numGrade1 = parseFloat(grade1);
        const numGrade2 = parseFloat(grade2);
        const numGrade3 = parseFloat(grade3);
        const numTotalGrade1 = parseFloat(totalGrade1);
        const numTotalGrade2 = parseFloat(totalGrade2);
        const numTotalGrade3 = parseFloat(totalGrade3);
        const numWeight1 = parseFloat(weight1);
        const numWeight2 = parseFloat(weight2);
        const numWeight3 = parseFloat(weight3);
        

        const totalGradeWeight = numWeight1 + numWeight2 + numWeight3;
        if (totalGradeWeight !== 100){
            alert("Total Grade Weight must equal 100. TotalGrade:" +totalGradeWeight);
            return;
        }
        const finalGrade = (numGrade1/numTotalGrade1)*numWeight1 + (numGrade2/numTotalGrade2)*numWeight2 + (numGrade3/numTotalGrade3)*numWeight3;
        alert("Your final grade is: " + finalGrade);
    };
    return <button onClick={handleClick}>Calculate</button>;
}

function GradeTable(){
    const [grade1, setGrade1] = useState("");
    const [totalGrade1, setTotalGrade1] = useState("");
    const [weight1,setWeight1] = useState("");
    const [grade2, setGrade2] = useState("");
    const [totalGrade2, setTotalGrade2] = useState("");
    const [weight2,setWeight2] = useState("");
    const [grade3, setGrade3] = useState("");
    const [totalGrade3, setTotalGrade3] = useState("");
    const [weight3,setWeight3] = useState("");
return(
    <table border="1">
        <thead>
        <tr>
            <th>Item Name</th>
            <th>Grade</th>
            <th>Weight</th>
            <th><CalculateButton 
                grade1={grade1}
                totalGrade1={totalGrade1}
                weight1={weight1}
                grade2={grade2}
                totalGrade2={totalGrade2}
                weight2={weight2}
                grade3={grade3}
                totalGrade3={totalGrade3}
                weight3={weight3}
            
                /></th>
                
        </tr>
        </thead>
        <tbody>
        <tr>    
            <td>Assignment 1</td>
            <td><input
                placeholder = "Enter Grade."
                value = {grade1}
                onChange={(e) => setGrade1(e.target.value)}/>
                /
                <input
                placeholder= "Enter Total Grade."
                value = {totalGrade1}
                onChange={(e) => setTotalGrade1(e.target.value)}/>
                </td>
            <td><input 
                placeholder = "Enter Grade Weight."
                value = {weight1}
                onChange={(e) => setWeight1(e.target.value)}/></td>
            <td>{grade1}</td>
        </tr>
        <tr>
            <td>Assignment 2</td>
            <td><input
                placeholder = "Enter Grade."
                value = {grade2}
                onChange={(e) => setGrade2(e.target.value)}/>
                /
                <input
                placeholder= "Enter Total Grade."
                value = {totalGrade2}
                onChange={(e) => setTotalGrade2(e.target.value)}/>
            </td>
            <td><input 
                placeholder = "Enter Grade Weight."
                value = {weight2}
                onChange={(e) => setWeight2(e.target.value)}/></td>
            <td>{grade2}</td>
        </tr>
        <tr>
            <td>Assignment 3</td>
            <td><input
                placeholder = "Enter Grade."
                value = {grade3}
                onChange={(e) => setGrade3(e.target.value)}/>
                /
                <input
                placeholder= "Enter Total Grade."
                value = {totalGrade3}
                onChange={(e) => setTotalGrade3(e.target.value)}/>
            </td>
            <td><input 
                placeholder = "Enter Grade Weight."
                value = {weight3}
                onChange={(e) => setWeight3(e.target.value)}/></td>
            <td>{grade3}</td>
        </tr>
        </tbody>
    </table>


    );
};

export default GradeTable;
export { CalculateButton};