import React, {useState, useEffect} from 'react';
import "../../styles/calcpage.scss";
import CalculateButton from './CalculateButton';
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";


function GradeTable({setFinalGrade}) {
    const {name} = useParams();
    const [assignments, setAssignments] = useState([]);
    const [courseId, setCourseId] = useState(null);


    useEffect(()=>{
        const fetchCourseId = async () =>{
            if (!auth.currentUser) return;
            const userId = auth.currentUser.uid;
            const coursesRef = collection(db, "Users", userId, "courses");
            const q = query(coursesRef, where("name","==", name));

            try{
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty){
                    const courseDoc = querySnapshot.docs[0];
                    setCourseId(courseDoc.id);
                }else{
                    console.log("Course not found");
                }

            } catch(error){
                console.error("Error fetching course ID:", error);
            }
        };
        fetchCourseId();
    }, [name]);

    useEffect(() =>{
        const fetchAssignments = async () =>{
            if (!auth.currentUser || !courseId) return;
            const userId = auth.currentUser.uid;
            const courseRef = doc(db, "Users", userId,"courses", courseId);

            try{
                const docSnap = await getDoc(courseRef);
                if (docSnap.exists()){
                    const data = docSnap.data();
                    setAssignments(data.assignments || []);
                    setFinalGrade(data.finalGrade || null);
                } else {
                    console.log("No existing assignments for this course");
                }
            } catch (error){
                console.error ("Error loading assignments:", error);
            }
        };

        fetchAssignments();
        
    }, [courseId, setFinalGrade]);


    useEffect(() =>{
        const saveAssignments = async () => {
            if(!auth.currentUser || assignments.length === 0 || !courseId) return;
            const userId = auth.currentUser.uid;
            const courseRef = doc(db, "Users", userId,"courses", courseId);

            try {
                await setDoc(courseRef, { assignments }, { merge: true });
                console.log("Assignments auto-saved!");
            } catch (error) {
                console.error("Error saving assignments:", error);
            }
        };
        saveAssignments();
        
    },[assignments,courseId]);

    const addRow = () =>{
        setAssignments([
            ...assignments,
            {id: assignments.length + 1, name: "Assignment " + (assignments.length + 1), grade: "", totalGrade: "", weight: ""}
        ])
    };

    const updateAssignment = (id, field, value) => {
        setAssignments(assignments.map(item => 
            item.id === id ? {...item, [field]: value} : item
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