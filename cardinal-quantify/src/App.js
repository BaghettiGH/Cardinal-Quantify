import logo from './logo.svg';
import './App.css';
import React from "react";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Sidebar />
      </header>
    </div>
  );
}

export default App;
