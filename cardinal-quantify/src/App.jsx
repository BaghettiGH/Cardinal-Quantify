import React from "react";
import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from "./pages/Courses";
import Feedback from "./pages/Feedback";

import Signout from "./pages/Signout";
import Sidebar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  
  return (
    <div>
      
      <Router>
     
      
      <Routes>
        <Route path = "/" element={<Login />} />
        <Route path = "/signup" element={<Signup />} />
      </Routes>
     
      </Router>
    </div>
  );
}

export default App;
