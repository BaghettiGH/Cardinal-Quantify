import React, { useState } from "react";
import '../styles/Courses.scss';
import { Link } from "react-router-dom";


//For random border color sa side ng course container
const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const Courses = () => {
  //const navigate = useNavigate(); 
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", subject: "", grade: "" });
  const [editIndex, setEditIndex] = useState(null);

  //To determine running ave
  const getRunningAverage = () => {
    if (courses.length === 0) return "N/A"; // If no grades yet
    const total = courses.reduce((sum, course) => sum + Number(course.grade), 0);
    return (total / courses.length).toFixed(2); // Average with 2 decimal places
  };  

  //To determine the color of the grade container
  const getGradeColor = (grade) => {
    const numericGrade = parseFloat(grade);
    if (numericGrade >= 1 && numericGrade <= 1.99) return "#33B864";
    if (numericGrade >= 2 && numericGrade <= 2.25) return "#9ACD32";
    if (numericGrade >= 2.26 && numericGrade <= 2.99) return "#FFDB58";
    if (numericGrade === 3) return "orange";
    if (numericGrade === 0) return "grey";
    return "red";
  };

  // error handling if no input
  const addOrEditCourse = () => {
    if (!newCourse.name || !newCourse.subject || !newCourse.grade) {
      alert("All fields are required!");
      return;
    }
  
    // Check for duplicate course name or subject (course code)
    const isDuplicate = courses.some(
      (course, index) =>
        (course.name.toLowerCase() === newCourse.name.toLowerCase() || 
         course.subject.toLowerCase() === newCourse.subject.toLowerCase()) &&
        index !== editIndex // Allow editing the same course
    );
  
    if (isDuplicate) {
      alert("A course with the same name or code already exists!");
      return;
    }
  
    if (editIndex !== null) {
      // Editing an existing course
      const updatedCourses = [...courses];
      updatedCourses[editIndex] = { ...newCourse, color: updatedCourses[editIndex].color }; // Keep original color
      setCourses(updatedCourses);
    } else {
      // Adding new course with a random color
      setCourses([...courses, { ...newCourse, color: getRandomColor() }]);
    }
  
    setNewCourse({ name: "", subject: "", grade: "" });
    setShowModal(false);
    setEditIndex(null);
  };
  

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const editCourse = (index) => {
    setNewCourse(courses[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="courses-wrapper">
    {/* Running Average Section */}
    <div className="running-average-container">
      <h2>Running Average</h2>
      <p>{getRunningAverage()}</p>
    </div>

      {/* Courses List */}
      {courses.map((course, index) => (
      <div className="course-container" key={index} style={{ borderLeft: `15px solid ${course.color}` }}>
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
        <button onClick={() => editCourse(index)} className="ellipsis-button">⋮</button>
      </div>
    </div>
    
      ))}

      {/* Floating Add Button */}
      <button className="add-button" onClick={() => setShowModal(true)}>+</button>

{/* Modal for Adding/Editing Course */}
{showModal && (
  <div className="addEdit-container">
    <div className="addEdit-modal">
      <h2>{editIndex !== null ? "Edit Course" : "Add Course"}</h2>

      <input
        className="course-name-input"
        type="text"
        placeholder="Course Name"
        value={newCourse.name}
        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
      />

      <input
        className="course-code-input"
        type="text"
        placeholder="Course Code"
        value={newCourse.subject}
        onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
      />

      <input
        className="course-grade-input"
        type="number"
        placeholder="Grade"
        value={newCourse.grade}
        onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
      />

      <button className="add-edit-course" onClick={addOrEditCourse}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <button
        className="cancel-button"
        onClick={() => {
          setShowModal(false);
          setEditIndex(null);
        }}
      >
        Cancel
      </button>

      {editIndex !== null && (
        <button
          className="delete-button"
          onClick={() => {
            removeCourse(editIndex);
            setShowModal(false);
          }}
        >
          Delete Course
        </button>
      )}
    </div>
  </div>
      )}
    </div>
  );
};

export default Courses;



