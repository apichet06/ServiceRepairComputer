// import './App.css'
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Employees from "./components/Employee/Employee";
import Division from "./components/Divisoin/Division";
import Position from "./components/Position/Position";
import Computer from "./components/Computer/Computer";
import Repair from "./components/Repair/Repair";
import Category from "./components/Categories/Categories";
import Repairwork from "./components/Repairwork/Repairwork";
import OwnWork from "./components/Ownwork/Repairwork";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Comment from "./components/Comment/Comment";
function App() {
  // const api = "http://localhost:8081/ServiceRepairComputer/api/";
  const api = "https://servicerepairapi.azurewebsites.net/api/";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login api={api} />} />
        <Route path="/Dashboard" element={<Dashboard api={api} />} />
        <Route path="/Employee" element={<Employees api={api} />} />
        <Route path="/Division" element={<Division api={api} />} />
        <Route path="/Position" element={<Position api={api} />} />
        <Route path="/Computer" element={<Computer api={api} />} />
        <Route path="/Repair" element={<Repair api={api} />} />
        <Route path="/Category" element={<Category api={api} />} />
        <Route path="/Repairwork" element={<Repairwork api={api} />} />
        <Route path="/OwnWork" element={<OwnWork api={api} />} />
        <Route path="/Comment" element={<Comment api={api} />} />
      </Routes>
    </Router>
  );
}
export default App;
