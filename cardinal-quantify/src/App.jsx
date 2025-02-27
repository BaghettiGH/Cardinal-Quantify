import React, {useState, useEffect} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Courses from "./pages/Courses";
import Feedback from "./pages/Feedback";


import Sidebar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { auth } from "./components/firebase";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {

 
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  
  return (
<<<<<<< HEAD
   
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              
              <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/dashboard" /> : <Login />}
              />
                <Route path = "/login" element={<Login />} />
                <Route path = "/signup" element={<Signup />} />

                <Route 
                element = {
                  <>
                   <Navbar />
                   <Outlet />
                  </>
                }>

                <Route path = "/dashboard" element={<Sidebar />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/feedback" element={<Feedback />} />
                </Route>
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </div>
      </Router>

=======
    <Router>
      <div className="app">
        <Sidebar />
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/signout" element={<Signout />} />
          </Routes>
      </div>
    </Router>
    
      
>>>>>>> calcpage
  );
}

export default App;
