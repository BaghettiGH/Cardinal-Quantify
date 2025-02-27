import React,  { useEffect, useState } from 'react';
import Logo from '../Assets/Logo.svg';
import { FaRegUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
<<<<<<< HEAD
import {doc, getDoc} from "firebase/firestore";
import { toast } from 'react-toastify';
import { auth, db } from './firebase';


=======
// import '.styles/Navbar.scss';
>>>>>>> calcpage
import { useLocation } from "react-router-dom";

const Navbar = () => { 
    const location = useLocation();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const [userDetail, setUserDetail] = useState(null);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
          console.log(user);
    
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetail(docSnap.data());
            console.log(docSnap.data());
          } else {
            console.log("User is not logged in");
          }
        });
      };
      useEffect(() => {
        fetchUserData();
      }, []);

      async function handleLogout(){
        try {
            await auth.signOut();
            console.log("User logged out successfully");
            window.location.href = "/login";
        } catch (error) {
            console.error(error.message);
            
        }
      }
    

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
                
                <FaRegUser className="profile" size="2rem" color="white"/>
                {userDetail ? (
                    <>
                    <div className="profileContents">
                    <p className="name"> {userDetail.firstName} {userDetail.lastName} </p>                    
                    </div>
                    </>

                ) : (
                    <p> Loading </p>
                )}
                
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/courses" ? "active" : ""}>
                      <FaBook color="white" size = "1.5em" className="icons" />
                        <a href="/courses">Courses</a>
                    </li>
                    <li className={location.pathname === "/feedback" ? "active" : ""}>
                    <MdFeedback color="white" size = "1.5em" className="icons" />
                        <a href="/feedback">Feedback</a>
                    </li>

                    <li onClick={handleLogout}>
                    <FaSignOutAlt color="white" size = "1.5em" className="icons" />
                        <a href="#">Signout</a>
                    </li>
                   
                </ul>
            </div>
        </div>
    );
};

export default Navbar;