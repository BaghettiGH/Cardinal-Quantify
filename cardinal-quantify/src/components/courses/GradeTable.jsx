import React, {useState} from 'react';
import "../../styles/calcpage.scss";
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
                {assignments.map((assignment) => {
                    const grade = parseFloat(assignment.grade) || 0;
                    const totalGrade = parseFloat(assignment.totalGrade) || 1;
                    const percentage = (grade / totalGrade) * 100;
                    
                    const getBackgroundColor = () =>{
                        if (!assignment.grade || !assignment.totalGrade) return "#CDCCCC";
                        if (percentage >= 95) return "#39E379";
                        if (percentage >= 85) return "#CDEE4B";
                        if (percentage >= 70) return "#FF9600";
                        return "#FF3B30";
                        };

                        return(                    
                        <tr key={assignment.id}>
                        <td><input 
                                className="item-name-input"
                                placeholder =" "
                                value = {assignment.name}
                                onChange={(e) => updateAssignment(assignment.id, "name", e.target.value)}
                            />
                        </td>
                        <td>
                            <div 
                            className = "grade-input-div"
                            style= {{ backgroundColor: getBackgroundColor() }}
                            >
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
                );
            })}
            </tbody>
        </table>
        <div className = "add-row">
        <button onClick={addRow}>+</button>
        </div>
    </div>
    );

}

export default GradeTable;