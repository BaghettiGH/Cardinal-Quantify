import React from "react";
import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from "./pages/EstGrade";
import Feedback from "./pages/Feedback";

import Signout from "./pages/Sign out";
import Sidebar from "./components/Navbar";



function App() {
  

  return (
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
    
      
  );
}

export default App;
