import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import '../styles/Courses.scss';
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from  "../components/firebase";
//For random border color sa side ng course container
const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const Courses = () => {
  //const navigate = useNavigate(); 
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", subject: "", grade: "" });
  const [editIndex, setEditIndex] = useState(null);
  const userCoursesCollection = collection(db, "Users", auth.currentUser.uid, "courses");
  
  useEffect(() =>{
    
    fetchCourses();
  }, []);
  const fetchCourses = async () => {
    if (!auth.currentUser) return;
    
    const snapshot = await getDocs(userCoursesCollection);
    setCourses(snapshot.docs.map(doc => ({id: doc.id, ...doc.data() })))
  };

  //To determine running ave
  const getRunningAverage = () => {

    const validCourses = courses.filter(course => course.grade !== "" && !isNaN(course.grade));    
    if (validCourses.length === 0) return 0; // If no grades yet
    const total = validCourses.reduce((sum, course) => sum + Number(course.grade), 0);
    return total / validCourses.length; // Average with 2 decimal places
  };  


  const getAverageColor = (average) => {
    if (average === 0) return "linear-gradient(to right, #FF3B30,rgb(245, 139, 134))"; // Default
    if (average >= 95) return "linear-gradient(to right, #39E379,rgb(173, 240, 199))"; // Excellent
    if (average >= 85) return "linear-gradient(to right, #CDEE4B,rgb(222, 235, 143))"; // Good
    if (average >= 70) return "linear-gradient(to right, #FF9600,rgb(247, 192, 121))"; // Passing
    return "linear-gradient(to right, #CDCCCC, #D3D3D3)"; // Failing
  };

  //To determine the color of the grade container
  const getGradeColor = (grade) => {
    const numericGrade = parseFloat(grade);
    if (numericGrade >= 95) return "#39E379";  // Excellent
    if (numericGrade >= 85) return "#CDEE4B";  // Good
    if (numericGrade >= 70) return "#FF9600";  // Passing
    if (numericGrade >= 0) return "#FF3B30";     // No grade
    return "#CDCCCC";  // Failing
  };

  // error handling if no input
  const addOrEditCourse = async () => {
    if (!auth.currentUser) return;
    if (!newCourse.name || !newCourse.subject) {
      alert("All fields are required!");
      return;
    }
    // const addOrEditCourse = () => {
    //   if (!newCourse.name || !newCourse.subject || !newCourse.grade) {
    //     alert("All fields are required!");
    //     return;
    //   }

  
    // Check for duplicate course name or subject (course code)
    const isDuplicate = courses.some(course =>
        (course.name.toLowerCase() === newCourse.name.toLowerCase() || 
         course.subject.toLowerCase() === newCourse.subject.toLowerCase()) &&
        course.id !== editIndex // Allow editing the same course
    );
  
    if (isDuplicate) {
      alert("A course with the same name or code already exists!");
      return;
    }
  
    if (editIndex) {
      // Editing an existing course
      const courseRef = doc(db, "Users", auth.currentUser.uid, "courses", editIndex);
      await updateDoc(courseRef, newCourse);
    } else {
      // Adding new course with a random color
      await addDoc(userCoursesCollection, {...newCourse, color:getRandomColor()});
    }
  
    setNewCourse({ name: "", subject: "", grade: "" });
    setShowModal(false);
    setEditIndex(null);
    fetchCourses();
  };
  

  const removeCourse = async (id) => {
    if (!auth.currentUser) return;

    await deleteDoc(doc(db, "Users",auth.currentUser.uid, "courses", id));
    fetchCourses();
  };

  const editCourse = (course) => {
    setNewCourse(course);
    setEditIndex(course.id);
    setShowModal(true);
  };

  return (
    <div className="courses-wrapper">
    {/* Running Average Section */}
    <div className = "courses-header">
      <h1>Courses</h1>
    </div>
    <div className="running-average-container"
          style = {{ background: getAverageColor(getRunningAverage()) }}
          >
      <h2>Running Average</h2>
      <p>{getRunningAverage() !== null ? getRunningAverage().toFixed(2) : "N/A"}</p>
    </div>

      {/* Courses List */}
      {courses.map((course) => (
      <div className="course-container" key={course.id} style={{ borderLeft: `15px solid ${course.color}` }}>
      <div>
        <p className="course-subject">{course.subject}</p>
        
        <Link to={`/course/${course.name}`} className="course-name">
          {course.name}
        </Link>
      </div>
      
      <span className="grade-container" style={{ background: getGradeColor(course.grade) }}>
        {course.grade}
      </span>
      
      <div className="edit-button">
        <button onClick={() => editCourse(course)} className="ellipsis-button">⋮</button>
      </div>
    </div>
    
      ))}

      {/* Floating Add Button */}
      <button className="add-button" onClick={() => setShowModal(true)}>+</button>

{/* Modal for Adding/Editing Course */}
{showModal && (
  <div className="addEdit-container">
    <div className="addEdit-modal">
      <div className = "modal-header">
      <h2>{editIndex !== null ? "Edit Course" : "Add Course"}</h2>
      <button
        className="cancel-button"
        onClick={() => {
          setShowModal(false);
        }}
      >
      <IoMdClose />
      </button>
      </div>
      <div className="modal-body">
        <h3>Course Name</h3>
      <input
        className="course-name-input"
        type="text"
        placeholder="Add Course Name"
        value={newCourse.name}
        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />

        <h3>Course Code</h3>
      <input
        className="course-code-input"
        type="text"
        placeholder="Add Course Code"
        value={newCourse.subject}
        onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
      />

      {/* <input
        className="course-grade-input"
        type="number"
        placeholder="Grade"
        value={newCourse.grade}
        onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
      /> */}
      <div className="button-container">
      <button className="add-edit-course" onClick={addOrEditCourse}>
        {editIndex !== null ? "Save" : "Add"}
      </button>
        
      {editIndex !== null && (
        <button
          className="delete-button"
          onClick={() => {
            removeCourse(editIndex);
            setShowModal(false);
          }}
        >
          Delete
        </button>
      )}
    </div>
  </div>
  </div>
  </div>
      )}
    </div>
  );
};

export default Courses;



