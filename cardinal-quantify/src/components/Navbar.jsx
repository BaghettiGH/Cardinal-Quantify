import React,  { useState } from 'react';
import Logo from '../Assets/Logo.svg';
import { FaRegUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
// import '.styles/Navbar.scss';
import { useLocation } from "react-router-dom";

const Navbar = () => { 
    const location = useLocation();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div
                className={
                    closeMenu === false
                        ? "logoContainer"
                        : "logoContainer active"
                }
            >
                <img src={Logo} alt="logo" className="logo" />
                <h2 className="title">Quantify </h2>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "burgerContainer"
                        : "burgerContainer active"
                }
            >
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "profileContainer"
                        : "profileContainer active"
                }
            >
                
                <FaRegUser className="profile" size="2em" color="white"/>
                <div className="profileContents">
                    <p className="name"> HELLO WORLD </p>                    
                </div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                      <FaBook color="white" size = "1.5em" className="icons" />
                        <a href="/">Courses</a>
                    </li>
                    <li className={location.pathname === "/feedback" ? "active" : ""}>
                    <MdFeedback color="white" size = "1.5em" className="icons" />
                        <a href="/feedback">Feedback</a>
                    </li>

                    <li className={location.pathname === "/signout" ? "active" : ""}>
                    <FaSignOutAlt color="white" size = "1.5em" className="icons" />
                        <a href="/signout">Signout</a>
                    </li>
                   
                </ul>
            </div>
        </div>
    );
};

export default Navbar;