import "../CSS/Todo.css";
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

  //using persisting data "context", instead of using useState the todo items
  //just use the states declared from the DataContext file, sample below

  //imbis na [todo,setTodo] = useState(null); yung from context nalang na ganto

  const { todo, setTodo } = useContext(DataContext);

  return (
    <div className="todoBody">
      <p>Todo Page</p>
    </div>
  );
}

export default Todo;
