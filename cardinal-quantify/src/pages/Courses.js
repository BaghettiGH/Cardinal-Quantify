import React, { useState } from "react";
import "../styles/courses.scss";
const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", subject: "", grade: "" });
  const [editIndex, setEditIndex] = useState(null);

  const getRunningAverage = () => {
    if (courses.length === 0) return "N/A"; // No grades yet
    const total = courses.reduce((sum, course) => sum + Number(course.grade), 0);
    return (total / courses.length).toFixed(2); // Average with 2 decimal places
  };  

  const getGradeColor = (grade) => {
    const numericGrade = parseFloat(grade);
    if (numericGrade >= 1 && numericGrade <= 1.99) return "#33B864";
    if (numericGrade >= 2 && numericGrade <= 2.25) return "#9ACD32";
    if (numericGrade >= 2.26 && numericGrade <= 2.99) return "#FFDB58";
    if (numericGrade === 3) return "orange";
    if (numericGrade === 0) return "grey";
    return "red";
  };

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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Running Average Section */}
      <div
        style={{
          background: "linear-gradient(to right, #888, #ccc)",
          padding: "20px",
          borderRadius: "5px",
          marginBottom: "20px",
          textAlign: "center",
          width: "100%",
          maxWidth: "1200px",
          marginLeft: "100px",
        }}
      >
        <h2 style={{ margin: 0 }}>Running Average</h2>
        <p style={{ fontSize: "32px", margin: "5px 0" }}>{getRunningAverage()}</p>
      </div>

      {/* Courses List */}
      {courses.map((course, index) => (
        <div
          key={index}
          style={{
            background: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            position: "relative",
            borderLeft: `8px solid ${course.color}`,
            width: "100%",
            maxWidth: "1210px",
            marginLeft: "100px",
            height: "65px",
          }}
        >
          <div>
            <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>{course.subject}</p>
            <p style={{ margin: "0", fontWeight: "bold" }}>{course.name}</p>
          </div>
          <span
            style={{
              background: getGradeColor(course.grade),
              color: "white",
              padding: "8px 15px",
              borderRadius: "15px",
              marginLeft: "1100px",
            }}
          >
            {course.grade}
          </span>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <button onClick={() => editCourse(index)}>⋮</button>
          </div>
        </div>
      ))}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#FFCE1B",
          border: "none",
          padding: "20px",
          borderRadius: "50%", 
          fontWeight: "bold",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          cursor: "pointer",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        +
      </button>

      {/* Modal for Adding/Editing Course */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "50px",
              borderRadius: "10px",
              width: "600px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "24px" }}>{editIndex !== null ? "Edit Course" : "Add Course"}</h2>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              style={{ width: "100%", padding: "15px", marginBottom: "10px", fontSize: "18px" }}
            />
            <input
              type="text"
              placeholder="Course Code"
              value={newCourse.subject}
              onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
              style={{ width: "100%", padding: "15px", marginBottom: "10px", fontSize: "18px" }}
            />
            <input
              type="number"
              placeholder="Grade"
              value={newCourse.grade}
              onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
              style={{ width: "100%", padding: "15px", marginBottom: "10px", fontSize: "18px" }}
            />
            <button onClick={addOrEditCourse} 
            style={{
                background: "#D3D3D3",
                color: "black",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                marginRight: "10px"
              }}>
              {editIndex !== null ? "Update" : "Add"}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setEditIndex(null);
              }}
              style={{
                background: "#D3D3D3",
                color: "black",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              Cancel
            </button>

            {editIndex !== null && (
  <button
    onClick={() => {
      removeCourse(editIndex);
      setShowModal(false); // Close modal after deletion
    }}
    style={{
      background: "red",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
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



