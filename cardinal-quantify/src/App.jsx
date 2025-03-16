import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { auth } from "./components/firebase";
import { Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Login";
import {SidebarProvider} from "./components/navbar/NavBarContext";
import {useSidebar} from "./components/navbar/NavBarContext";
import Signup from "./components/Signup";
import Courses from "./pages/Courses";
import Feedback from "./pages/Feedback";
import CalcPage from "./pages/CalcPage";
import EstGrade from "./pages/EstGrade";
import EmailVerification from "./components/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

 

  
      

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const ProtectedRoutes = () => {
    const { closeMenu } = useSidebar(); // Get sidebar state
  
    return (
      <>
        <Navbar />
        <div className={`content-wrapper ${closeMenu ? "shifted" : ""}`}>
          <Outlet />
        </div>
      </>
    );
  };

  return (
    <SidebarProvider>
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
              <Route path="/course/:name/" element={<CalcPage />} />
              <Route path="/course/:name/compute-grade" element={<CalcPage />}/>
              <Route path="/course/:name/estimate-grade" element={<EstGrade /> }/>
              <Route path="*" element={<Navigate to="/courses" />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
    </SidebarProvider>
  );
}

export default App;
