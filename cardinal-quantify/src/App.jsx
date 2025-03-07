import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { auth } from "./components/firebase";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Courses from "./pages/Courses";
import Feedback from "./pages/Feedback";
import CalcPage from "./pages/CalcPage";
import EmailVerification from "./components/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [closeMenu, setCloseMenu] = useState(false);
  
      const handleCloseMenu = () => {
        setCloseMenu((prev) => !prev);
      };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const ProtectedRoutes = () => (
    <>
     <Navbar closeMenu={closeMenu} handleCloseMenu={handleCloseMenu} />
     <div className={`content-wrapper ${closeMenu ? "active" : ""}`}>
        <Outlet />
      </div>
    </>
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect if user is logged in */}
          <Route path="/" element={user ? <Navigate to="/courses" /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailverification" element={<EmailVerification />} />

          {user ? (
            <Route element={<ProtectedRoutes />}>
              <Route path="/courses" element={<Courses />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/course/:name" element={<CalcPage />} />
              <Route path="*" element={<Navigate to="/courses" />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
