import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./commun/pages/Login";
import Home from "./commun/pages/Home";
import Students from "./admin/pages/Students";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/etudiants" element={<Students/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
