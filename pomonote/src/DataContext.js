import React, { createContext, useState, useEffect } from "react";

// Create the context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem("subjects")) || []
  );

  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("login")) || null
  );

  // Load state from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsers(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("login");
    if (storedData) {
      setLoggedIn(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("todos");
    if (storedData) {
      setTodo(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("subjects");
    if (storedData) {
      setSubjects(JSON.parse(storedData));
    }
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(loggedIn));
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        todo,
        setTodo,
        subjects,
        setSubjects,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
