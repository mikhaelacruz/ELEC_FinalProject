import { useState, useContext, useEffect } from "react";
import "../CSS/Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const formChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const { users, setUsers } = useContext(DataContext);

  const { loggedIn, setLoggedIn } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(loggedIn);
    if (loggedIn) navigate("/home");
  }, []);

  const validate = () => {
    const test = users.find((x) => (x.email = form.email));
    if (test) {
      if (test.password != form.password) {
        alert("Incorrect Credentials");
        return;
      }

      setLoggedIn({ username: test.username, email: form.email });

      navigate("/home");
      return;
    }
    alert("Incorrect Credentials");
  };

  return (
    <div className="body">
      <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
        <div className="logo">
          <img src="/Blog.png" alt="No img" />
        </div>

        <div className="inputWithIcon">
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={formChange}
            value={form.email}
          />
          <FaUser />
        </div>
        <div className="inputWithIcon">
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={formChange}
            value={form.password}
          />
          <FaLock />
        </div>

        <input
          className="loginBtn"
          type="button"
          onClick={validate}
          value="Login"
        />
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
