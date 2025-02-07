import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="app">
      {/* Pass toggle function to Sidebar */}
      <Sidebar toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      {/* Adjust main content based on sidebar state */}
      <div className={`main-content ${isSidebarCollapsed ? "collapsed" : "expanded"}`}>
        <h1>Course Name</h1>
        {/* Other UI content here */}
        <div className ="taskbar">
          <ul>
            <li>Compute Grade</li>
            <li>Estimate Grade</li>
          </ul>
          
          </div>
      </div>
    </div>
  );
}

export default App;
