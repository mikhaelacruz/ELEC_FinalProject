import "./CSS/App.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./Pages/Login.js";
import Todo from "./Pages/Todo.js";
import Home from "./Pages/Home.js";
import SignUp from "./Pages/SignUp.js";
import Pomodoro from "./Pages/Pomodoro.js";
import { DataProvider, DataContext } from "./DataContext";
import { TaskProvider } from "./contexts/TaskProvider.js";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const { setLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();

  const exit = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="Navbar">
      <div className="logo">
        <img src="/Vegapotsu.png" alt="" />
      </div>
      <div className="navRight">
        <NavLink to="/home" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/todo" activeClassName="active">
          Todo
        </NavLink>
        <NavLink to="/pomodoro" activeClassName="active">
          Pomodoro
        </NavLink>
        <button onClick={exit} className="logoutButton">
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
}

function App() {
  const location = useLocation();
  const noNavbar = ["/", "/login", "/signup"];
  const showNavbar = !noNavbar.includes(location.pathname);

  return (
    <DataProvider>
      <TaskProvider>
        {showNavbar && <Navbar />}
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Routes>
      </TaskProvider>
    </DataProvider>
  );
}

export default App;
