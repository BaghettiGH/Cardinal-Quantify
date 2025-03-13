import React,  { useEffect, useState } from 'react';
import Logo from '../../Assets/Logo.svg';
import { FaRegUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import {doc, getDoc} from "firebase/firestore";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {signOut, onAuthStateChanged} from "firebase/auth";
import { useSidebar } from "./NavBarContext";
// import '.styles/Navbar.scss';
import { useLocation } from "react-router-dom";
import "../../styles/navbar.scss";

const Navbar = () => { 
    const location = useLocation();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { closeMenu, handleCloseMenu } = useSidebar(); 
   


    const [userDetail, setUserDetail] = useState(null);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            if (user) {
              const docRef = doc(db, "Users", user.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setUserDetail(docSnap.data());
                console.log(docSnap.data());
              } else {
                console.log("No such document!");
              }
            } else {
              console.log("User is not logged in");
              setUserDetail(null); // Reset user details when logged out
            }
          });
      };
      //fetch user data
      useEffect(() => {
        fetchUserData();
      }, []);

      //auth state changes
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup listener
      }, []);

      async function handleLogout(){
        signOut(auth)
        .then(() => {
          console.log('User logged out successfully');
          setUser(null);
          setUserDetail(null); // Clear user state
          navigate('/login'); // Navigate to login page
        })
        .catch((error) => {
          console.error('Logout error:', error.message);
        });
      }
    

    return (
    <div className='navbar-wrapper'>
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
                    onClick={handleCloseMenu}
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
                
                <FaRegUser className="profile" size="25px" color="white"/>
                {userDetail ? (
                    <>
                    <div className="profileContents">
                    <p className="name"> {userDetail.firstName} {userDetail.lastName} </p>                    
                    </div>
                    </>

                ) : (
                    <p> </p>
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
                
                    <li className={location.pathname === "/courses" ? "active" : ""} onClick={() => navigate("/courses")}>
                    <FaBook size="25px" className="icons" />
                    <span className="link">Courses</span>
                    </li>
                    <li className={location.pathname === "/feedback" ? "active" : ""} onClick={() => navigate("/feedback")}>
                    <MdFeedback size="25px" className="icons" />
                    <span className="link">Feedback</span>
                    </li>

                    <li onClick={handleLogout}>
                    <FaSignOutAlt size="25px" className="icons" />
                    <span className="link">Signout</span>
                    </li>
                   
                </ul>
            </div>
        </div>
    </div>
    );
};

export default Navbar;