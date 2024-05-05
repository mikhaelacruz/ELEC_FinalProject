import "../CSS/Home.css";
import { DataContext } from "../DataContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Todo() {
  const { loggedIn, setLoggedIn } = useContext(DataContext);

  const navigate = useNavigate();

  //checks if user is logged in or not, if not go to login page
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  return (
    <div className="homeBody">
      <p>Home Page</p>
    </div>
  );
}

export default Todo;
