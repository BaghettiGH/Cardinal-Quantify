import React, { useState, useEffect } from 'react';
import '../styles/estgrade.scss';
import GradeTable from '../components/courses/GradeTable';
import { NavLink, useParams } from 'react-router-dom';
import { db, auth } from "../components/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import EstGradeTable from '../components/courses/EstGradeTable';


const EstGradePg =() =>{

  const { name } = useParams();
  const [finalGrade, setFinalGrade] = useState(null);
  const [desiredGrade, setDesiredGrade] = useState("");

    useEffect(() =>{
      if (finalGrade !== null){
        updateGradeInFirestore(finalGrade);
      }
    }, [finalGrade]);
  
    const updateGradeInFirestore = async (grade) => {
      if (!auth.currentUser) return;
  
      const coursesCollection = collection(db, "Users", auth.currentUser.uid, "courses");
      const q = query(coursesCollection, where("name", "==", name));
  
      const snapshot = await getDocs(q);
      if(!snapshot.empty){
        const CourseDoc = snapshot.docs[0];
        const courseRef = doc(db, "Users", auth.currentUser.uid, "courses", CourseDoc.id);
  
        await updateDoc(courseRef,{ grade: grade.toFixed(2) });
  
      }
  
    };



  const getBackgroundColor = (grade) =>{
    if (grade === ""|| isNaN(parseFloat(grade))) return "#CDCCCC";
    const numGrade = parseFloat(grade);
    if (numGrade >= 95) return "#39E379";
    if (numGrade >= 85) return "#CDEE4B";
    if (numGrade >= 70) return "#FF9600";
    return "#FF3B30";
  }

  const handleInputChange = (e) =>{
    let value = e.target.value.replace("%","").trim();
    if (value === ""){
      setDesiredGrade("");
      return;
    }
  

  let numValue = parseFloat(value);
  if (isNaN(numValue)) return;
  if (numValue < 0) numValue =0;
  if (numValue > 100) numValue = 100;

  setDesiredGrade(numValue.toString());

  }


  return (
    <div className="courses-container">
      <div className="main-content">
      <div className = "header">
      <h1>{ name }</h1>
      </div>      
      <div className = "task-bar">
        <ul className = "task-list">
          <div className = "compute-grade-div">
          <li><NavLink to = "/compute-grade" activeClassName="active-link">Compute Grade</NavLink></li>
          </div>
          <div className = "estimate-grade-div">
          <li><NavLink to = {`/course/${name}/estimate-grade`} activeClassName="active-link">Estimate Grade</NavLink></li>
          </div>
        </ul>
      </div>
      <div className ="desired-grade-div">
        <h2>Desired Grade:</h2>
        <div className="desired-grade-container" style = {{ backgroundColor: getBackgroundColor(desiredGrade) }}>
          <input className = "desired-grade-input"
                 type="text"
                 value = {desiredGrade !== "" ? desiredGrade + "%":""}
                 onChange={handleInputChange}
          />
        </div>
      </div>
      <EstGradeTable desiredGrade={desiredGrade}/>
    </div>
    </div>
  );
}

export default EstGradePg;