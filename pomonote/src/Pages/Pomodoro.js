import "../CSS/Pomodoro.css";
import { DataContext } from "../DataContext";
import { useContext, useEffect, useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Pomodoro() {
  const {
    loggedIn,
    seconds,
    setSeconds,
    resetSeconds,
    setResetSeconds,
    startTimer,
    stopTimer,
    timing,
  } = useContext(DataContext);
  const navigate = useNavigate();

  // Check if the user is logged in, if not navigate to the login page
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (timing) startTimer();
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="pomodoroBody">
      <div className="buttons">
        <button
          className="button"
          onClick={() => {
            stopTimer();
            setSeconds(1500);
            setResetSeconds(1500);
          }}
        >
          Work
        </button>
        <button
          className="button"
          onClick={() => {
            stopTimer();
            setSeconds(300);
            setResetSeconds(300);
          }}
        >
          Short Break
        </button>
        <button
          className="button"
          onClick={() => {
            stopTimer();
            setSeconds(900);
            setResetSeconds(900);
          }}
        >
          Long Break
        </button>
      </div>
      <div className="timer">{formatTime(seconds)}</div>
      <div className="buttons">
        <button className="smallb" onClick={startTimer}>
          Start
        </button>
        <button className="smallb" onClick={stopTimer}>
          Stop
        </button>
        <button
          className="smallb"
          onClick={() => {
            stopTimer();
            setSeconds(resetSeconds);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
