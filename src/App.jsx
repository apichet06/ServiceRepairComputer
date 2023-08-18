// import './App.css'
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Employees from "./components/Employee/Employee";
import Division from "./components/Divisoin/Division";
import Position from "./components/Position/Position";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const api = "http://localhost:8081/ServiceRepairComputer/api/";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login api={api} />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Employee" element={<Employees api={api} />} />
        <Route path="/Division" element={<Division api={api} />} />
        <Route path="/Position" element={<Position api={api} />} />
      </Routes>
    </Router>
  );
}
export default App;
