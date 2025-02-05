import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <h1>Course Name</h1>
        {/* Other UI content here */}
      </div>
    </div>
  );
}

export default App;
