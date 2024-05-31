import "../CSS/SignUp.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../DataContext";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const formChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const navigate = useNavigate();

  const { users, setUsers } = useContext(DataContext);

  const { loggedIn, setLoggedIn } = useContext(DataContext);

  useEffect(() => {
    if (loggedIn) navigate("/home");
  }, []);

  const validateEmail = (email) => {
    // Regex for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validate = () => {
    if (
      form.email === "" ||
      form.username === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      alert("Fields cannot be null.");
      return;
    }

    if (!validateEmail(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (users.find((x) => x.email === form.email)) {
      alert("Email already exists.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    //update state
    setUsers((prev) => [
      ...prev,
      { username: form.username, email: form.email, password: form.password },
    ]);

    alert("Sign Up successful!.");

    navigate("/login");
  };

  return (
    <div className="body">
      <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
        <div className="logo">
          <img src="/Vegapotsu.png" alt="" />
        </div>

        <div className="inputWithIcon">
          <input
            type="email"
            name="email"
            onChange={formChange}
            placeholder="Enter email"
            value={form.email}
          />
          <FaUser />
        </div>
        <div className="inputWithIcon">
          <input
            type="text"
            name="username"
            onChange={formChange}
            placeholder="Enter Username"
            value={form.username}
          />
          <FaUser />
        </div>
        <div className="inputWithIcon">
          <input
            type="password"
            name="password"
            onChange={formChange}
            placeholder="Enter Password"
            value={form.password}
          />
          <FaLock />
        </div>
        <div className="inputWithIcon">
          <input
            type="password"
            name="confirmPassword"
            onChange={formChange}
            placeholder="Confirm Password"
            value={form.confirmPassword}
          />
          <FaLock />
        </div>

        <input
          className="loginBtn"
          type="button"
          value="Sign Up"
          onClick={validate}
        />
        <p>
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
