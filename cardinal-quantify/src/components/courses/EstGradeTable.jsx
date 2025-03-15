import React, {useState} from 'react';
import "../../styles/estgrade.scss";
import EstimateButton from './EstimateButton';



function EstGradeTable({setFinalGrade, desiredGrade}) {
    const [assignments, setAssignments] = useState([
        {id: 1, name: "Assignment 1", grade: "", totalGrade: "100", weight: "", neededGrade:""},
        {id: 2, name: "Assignment 2", grade: "", totalGrade: "100", weight: "", neededGrade:""},
        {id: 3, name: "Assignment 3", grade: "", totalGrade: "100", weight: "", neededGrade:""}
    ]);

    const addRow = () =>{
        setAssignments([
            ...assignments,
            {
                id: assignments.length + 1, 
                name: "Assignment " + (assignments.length + 1),
                grade: "", totalGrade: "100", weight: "",neededGrade:""}
        ])
    };

    const updateAssignment = (id, field, value) => {
        setAssignments(assignments.map(item => 
            (item.id === id ? {...item, [field]: value} : item)
        ));

    };
    const updateNeededGrades = (neededGrades) =>{
        setAssignments(assignments.map(assignment => ({
            ...assignment,
            neededGrade: neededGrades[assignment.id] ||""

        })));
    };

    const getBackgroundColor = (assignment) =>{
        if (!assignment || assignment.grade === "" || !assignment.totalGrade === "") return "#CDCCCC";
        const grade = parseFloat(assignment.grade) || 0;
        const totalGrade = parseFloat(assignment.totalGrade) || 1;
        const percentage = (grade/totalGrade)*100;
        if (percentage >= 95) return "#39E379";
        if (percentage >= 85) return "#CDEE4B";
        if (percentage >= 70) return "#FF9600";
        return "#FF3B30";
        };

    
    return(
        <div className = "grade-table">
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Grade</th>
                    <th>Weight</th>
                    <th><EstimateButton 
                    assignments={assignments} 
                    desiredGrade={desiredGrade}
                    setNeededGrades={updateNeededGrades}/>
                    </th>
                </tr>
            </thead>
            <tbody>
                {assignments.map((assignment) => (
                    
                        
                        <tr key={assignment.id}>
                        <td>
                            <input 
                                className="item-name-input"
                                placeholder =" "
                                value = {assignment.name}
                                onChange={(e) => updateAssignment(assignment.id, "name", e.target.value)}
                            />
                        </td>
                        <td>
                            <div 
                            className = "grade-input-div"
                            style= {{ backgroundColor: getBackgroundColor(assignment) }}
                            >
                            <input
                                type="number"
                                min="0"
                                className = "grade-input"
                                value={assignment.grade}
                                onChange={(e) => updateAssignment(assignment.id, "grade", e.target.value)}
                            />
                            <b>/</b>
                            <input
                                className = "total-grade-input"
                                type="number"
                                min="1"
                                value={assignment.totalGrade}
                                onChange={(e) => updateAssignment(assignment.id, "totalGrade", e.target.value)}
                            />
                            </div>
                        </td>
                        <td>
                            <div className = "weight-div">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                className = "weight-input"
                                value={assignment.weight}
                                onChange={(e) => updateAssignment(assignment.id, "weight", e.target.value)}
                                placeholder=" "
                            />
                            </div>
                        </td>
                        <td>
                           {assignment.neededGrade ? assignment.neededGrade: "-"}
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

export default EstGradeTable;