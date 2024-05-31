import React, { useState, useEffect, useContext } from "react";
import "../CSS/Todo.css";
import { DataContext } from "../DataContext";
import { TaskContext } from "../contexts/TaskProvider";

function Todo() {
  const { loggedIn } = useContext(DataContext);
  const { list, setList } = useContext(TaskContext);
  const [userInput, setUserInput] = useState("");
  const [sortByChecked, setSortByChecked] = useState(false);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = {
        id: Math.random(),
        value: userInput.trim(),
        done: false,
      };
      setList([...list, newItem]);
      setUserInput("");
    }
  };

  const deleteItem = (key) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList);
  };

  const markAsDone = (index) => {
    const updatedList = [...list];
    updatedList[index].done = !updatedList[index].done;
    setList(updatedList);
  };

  const editItem = (index) => {
    const editedTodo = prompt("Edit the task:", list[index].value);
    if (editedTodo !== null && editedTodo.trim() !== "") {
      const updatedList = [...list];
      updatedList[index].value = editedTodo.trim();
      setList(updatedList);
    }
  };

  const clearTasks = () => {
    setList([]);
  };

  const handleSortByChecked = () => {
    setSortByChecked(!sortByChecked);
  };

  const sortedList = sortByChecked
    ? [...list].sort((a, b) => a.done - b.done)
    : list;

  return (
    <div>
      {loggedIn ? (
        <div className="bodyTask">
          <div className="">
            <input
              className="addTask"
              type="text"
              placeholder="add task . . ."
              value={userInput}
              onChange={(e) => updateInput(e.target.value)}
            />
            <input
              className="addButton"
              type="button"
              value="ADD"
              onClick={addItem}
            />
            <input
              className="clearButton"
              type="button"
              value="CLEAR"
              onClick={clearTasks}
            />
            <select className="custom-select" onChange={handleSortByChecked}>
              <option value="">Sort by</option>
              <option value="checked">Sort by checked</option>
            </select>
          </div>

          <div className="taskList">
            <ul>
              {sortedList.map((item, index) => (
                <li key={index} className="eachTask">
                  <div className="spanTask">
                    <span
                      style={{
                        textDecoration: item.done ? "line-through" : "none",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                  <div className="btnContainer">
                    <input
                      className="doneButton"
                      type="button"
                      value="✔"
                      onClick={() => markAsDone(index)}
                    />
                    <input
                      className="doneButton"
                      type="button"
                      value="✎"
                      onClick={() => editItem(index)}
                    />
                    <input
                      className="doneButton"
                      type="button"
                      value="✖"
                      onClick={() => deleteItem(item.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="loginMessage">Please log in to view tasks</div>
      )}
    </div>
  );
}

export default Todo;
