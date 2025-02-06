import React from "react";
import "./Sidebar.css";
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <h2>Cardinal Quantify</h2>
                    {/* replace this with an image */}
            </div>
            <div className ="profile">
                {/* add profile picture placeholder */}
                <p>User name</p>
            </div>
        <ul>
            <li>Courses</li>
            <li>Feedback</li>
            <li>Signout</li>
        </ul>
        </div>
    );
};

export default Sidebar;
