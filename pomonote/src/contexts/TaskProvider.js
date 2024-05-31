import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <TaskContext.Provider value={{ list, setList }}>
      {children}
    </TaskContext.Provider>
  );
};
