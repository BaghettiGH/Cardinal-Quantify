import React, { useState } from "react";
import "./Sidebar.css"; 

const Sidebar = () => {

  return (
    <div className="sidebar">
    
        <div>
            <div className="logo">
                <h2>Cardinal Quantify</h2>
            </div>
          <div className="profile">
            <p>User Name</p>
          </div>
          <ul>
            <li>Courses</li>
            <li>Feedback</li>
            <li>Sign Out</li>
          </ul>
        </div>
    </div>
  );
};

export default Sidebar;
