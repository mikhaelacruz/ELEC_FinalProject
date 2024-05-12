import "../CSS/Pomodoro.css";
import { DataContext } from "../DataContext";
import { useContext, useEffect, useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser, FaLock } from "react-icons/fa";
function Pomodoro() {
  const { loggedIn } = useContext(DataContext);

  const navigate = useNavigate();

  //checks if user is logged in or not, if not go to login page
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  const [seconds, setSeconds] = useState(1500);

  const [resetSeconds, setResetSeconds] = useState(seconds);

  const [timing, setTiming] = useState(false);


  //use ref is parang state din na pwede mag store ng values
  //sakanya isstore yung parang timer function
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {

    //if ongoing yung timer, bawal istart uli
    if (timing && seconds === 0) return;

    //set timing to true para alam ng app na ongoing si timer
    setTiming(true);

    //setInterval is yung function na continuously nag rrun until istop
    intervalRef.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => {
          if (prevSeconds - 1 === 0)
            setTiming(false);
          return prevSeconds - 1
        });

      }
    }, 1000);

    //clearInterval yung pang stop ng timer
    return () => clearInterval(intervalRef.current);
  }, [seconds, timing]);

  //calls the interval function (yungtimer) tas rinereset, parang setState
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  //computes for the minutes and seconds so it can be displayed as 
  //mm:ss
  //input is in seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <div className="pomodoroBody">
      <div className="buttons">
        <button className="button" onClick={() => {
          stopTimer();
          setSeconds(1500);
          setResetSeconds(1500);
        }}>Work</button>
        <button className="button" onClick={() => {
          stopTimer();
          setSeconds(300)
          setResetSeconds(300);
        }}>Short Break</button>
        <button className="button" onClick={() => {
          stopTimer();
          setSeconds(900);
          setResetSeconds(900);
        }}>Long Break</button>
      </div>
      <div className="timer">{formatTime(seconds)}</div>
      <div className="buttons">
        <button className="smallb" onClick={startTimer}>Start</button>
        <button className="smallb" onClick={stopTimer}>Stop</button>
        <button className="smallb" onClick={() => {
          stopTimer();
          setSeconds(resetSeconds)
        }}>Reset</button>
      </div>
    </div>
  );
}

export default Pomodoro;
