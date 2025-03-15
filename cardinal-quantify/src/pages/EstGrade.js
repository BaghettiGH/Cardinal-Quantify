import React, { useState, useEffect } from 'react';
import '../styles/estgrade.scss';
import GradeTable from '../components/courses/GradeTable';
import { NavLink, useParams } from 'react-router-dom';
import { db, auth } from "../components/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";


const EstGradePg =() =>{

  const { name } = useParams();
  const [finalGrade, setFinalGrade] = useState(null);

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



  const getBackgroundColor = () =>{
    if (finalGrade === null) return "#CDCCCC";
    if (finalGrade >= 95) return "#39E379";
    if (finalGrade >= 85) return "#CDEE4B";
    if (finalGrade >= 70) return "#FF9600";
    return "#FF3B30";
  }


  return (
    <div className="courses-container">
      <div className="main-content">
      <div className = "header">
      <h1>{ name }</h1>
      {/* <div className = "final-grade" style = {{ backgroundColor: getBackgroundColor() }}>
        <h3>{finalGrade !== null ? finalGrade.toFixed(2) : "--"}</h3></div> */}
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
        {/* <h2>Desired Grade:</h2> */}
        <div className="desired-grade-container" style = {{ backgroundColor: getBackgroundColor() }}>
          <input className = "desired-grade-input" 
          />
        </div>
      </div>
      <GradeTable />
    </div>
    </div>
  );
}

export default EstGradePg;