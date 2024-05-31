import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

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

  const [seconds, setSeconds] = useState(
    JSON.parse(localStorage.getItem("secs")) || 1500
  );
  const [resetSeconds, setResetSeconds] = useState(
    JSON.parse(localStorage.getItem("resetSecond")) || 1500
  );
  const [timing, setTiming] = useState(
    JSON.parse(localStorage.getItem("timing")) || false
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

  useEffect(() => {
    const storedData = localStorage.getItem("secs");
    if (storedData) {
      setUsers(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("resetSecond");
    if (storedData) {
      setUsers(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("timing");
    if (storedData) {
      setUsers(JSON.parse(storedData));
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

  useEffect(() => {
    localStorage.setItem("secs", JSON.stringify(seconds));
  }, [seconds]);

  useEffect(() => {
    localStorage.setItem("resetSecond", JSON.stringify(resetSeconds));
  }, [resetSeconds]);

  useEffect(() => {
    localStorage.setItem("timing", JSON.stringify(timing));
  }, [timing]);

  // useRef is used to store the timer function
  const intervalRef = useRef(null);

  // Clean up the interval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = useCallback(() => {
    if (timing || seconds === 0) return;

    setTiming(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setTiming(false);
          clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
  }, [timing, seconds]);

  const stopTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setTiming(false);
  }, []);

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
        seconds,
        setSeconds,
        resetSeconds,
        setResetSeconds,
        timing,
        setTiming,
        startTimer,
        stopTimer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
