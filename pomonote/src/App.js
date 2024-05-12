import "./CSS/App.css";
import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Link,
} from "react-router-dom";
import Login from "./Pages/Login.js";
import Todo from "./Pages/Todo.js";
import Home from "./Pages/Home.js";
import SignUp from "./Pages/SignUp.js";
import Pomodoro from "./Pages/Pomodoro.js";
import { DataContext } from "./DataContext.js";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function App() {
  const location = useLocation();
  const noNavbar = ["/", "/login", "/signup"];
  const showNavbar = !noNavbar.includes(location.pathname);

  const { loggedIn, setLoggedIn } = useContext(DataContext);

  const navigate = useNavigate();

  const exit = () => {
    setLoggedIn(null);

    navigate("login");
  };

  return (
    <>
      {showNavbar ? (
        <nav className="Navbar">
          <div className="logo">
            <img src="/Blog.png" alt="No img" />
          </div>
          <div className="navRight">
            <Link to="/home">Home</Link>
            <Link to="/todo">Todo</Link>
            <Link to="/pomodoro">Pomodoro</Link>
            <Link onClick={exit}>
              <FaSignOutAlt />
            </Link>
          </div>
        </nav>
      ) : null}

      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
    </>
  );
}

export default App;
