import React, {useState} from 'react';
import "../../styles/courses.scss";

function CalculateButton({ assignments }) {
    const handleClick = () => {
        let totalGradeWeight = assignments.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
        if (totalGradeWeight !== 100){
            alert("Total Grade Weight must equal 100. TotalGrade:" +totalGradeWeight);
            return;
        }
        
        let finalGrade = assignments.reduce((sum, item) => {
            const numGrade = parseFloat(item.grade);
            const numTotalGrade = parseFloat(item.totalGrade);
            const numWeight = parseFloat(item.weight);
            
            if (isNaN(numGrade) || isNaN(numTotalGrade) || isNaN(numWeight) || numTotalGrade === 0) {
                return sum;
            }
            return sum + (numGrade / numTotalGrade * numWeight);
        },0);
        alert("Final Grade: " + finalGrade);
    };
    return <button onClick={handleClick}>Calculate</button>;
}

function GradeTable(){
    const [assignments, setAssignments] = useState([
        {id: 1, name: "Assignment 1", grade: "", totalGrade: "", weight: ""},
        {id: 2, name: "Assignment 2", grade: "", totalGrade: "", weight: ""},
        {id: 3, name: "Assignment 3", grade: "", totalGrade: "", weight: ""}
    ]);

    const addRow = () =>{
        setAssignments([
            ...assignments,
            {id: assignments.length + 1, name: "Assignment " + (assignments.length + 1), grade: "", totalGrade: "", weight: ""}
        ])
    };

    const updateAssignment = (id, field, value) => {
        setAssignments(assignments.map(item => (item.id === id ? {...item, [field]: value} : item)));
    };

    return(
        <div>
        <table border="1">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Grade</th>
                    <th>Weight</th>
                    <th><CalculateButton assignments={assignments} /></th>
                </tr>
            </thead>
            <tbody>
                {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                        <td>{assignment.name}</td>
                        <td>
                            <input
                                placeholder="Enter Grade."
                                value={assignment.grade}
                                onChange={(e) => updateAssignment(assignment.id, "grade", e.target.value)}
                            />
                            /
                            <input
                                placeholder="Enter Total Grade."
                                value={assignment.totalGrade}
                                onChange={(e) => updateAssignment(assignment.id, "totalGrade", e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                placeholder="Enter Grade Weight."
                                value={assignment.weight}
                                onChange={(e) => updateAssignment(assignment.id, "weight", e.target.value)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={addRow}>+</button>
    </div>
    )

};

export default GradeTable;
export { CalculateButton};