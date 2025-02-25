import React, {useState} from 'react';
import "../../styles/courses.scss";
import CalculateButton from './CalculateButton';



function GradeTable({setFinalGrade}) {
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
        setAssignments(assignments.map(item => 
            (item.id === id ? {...item, [field]: value} : item)
        ));
    };

    return(
        <div className = "grade-table">
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Grade</th>
                    <th>Weight</th>
                    <th><CalculateButton assignments={assignments} setFinalGrade={setFinalGrade}/></th>
                </tr>
            </thead>
            <tbody>
                {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                        <td>{assignment.name}</td>
                        <td>
                            <div className = "grade-input-div">
                            <input
                                className = "grade-input"
                                value={assignment.grade}
                                onChange={(e) => updateAssignment(assignment.id, "grade", e.target.value)}
                            />
                            <b>/</b>
                            <input
                                className = "total-grade-input"
                                value={assignment.totalGrade}
                                onChange={(e) => updateAssignment(assignment.id, "totalGrade", e.target.value)}
                            />
                            </div>
                        </td>
                        <td>
                            <div className = "weight-div">
                            <input
                                className = "weight-input"
                                value={assignment.weight}
                                onChange={(e) => updateAssignment(assignment.id, "weight", e.target.value)}
                                placeholder=" "
                            />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className = "add-row">
        <button onClick={addRow}>+</button>
        </div>
    </div>
    );

}

export default GradeTable;