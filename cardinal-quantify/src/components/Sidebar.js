import React from "react";

const Sidebar = () => {
    return (
        <div className="sidebar">
        <h2>Cardinal Quantify</h2>
        <ul>
            <li>Courses</li>
            <li>Feedback</li>
        </ul>
        <button className = "signout">Sign Out</button>
        </div>
    );
};

export default Sidebar;