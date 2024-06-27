import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";

const red = "#ff6961";
const green = "#4aec8c";
const blue = "#6495ED";

const colorMap = {
  work: red, // red
  break: green, // green
  "long-break": blue, // blue
};

const Timer = (props) => {
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); //can be 'work', 'break' or 'long break'
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [currInterval, setCurrInterval] = useState(0);
  const [sessionTime, setSessionTime] = useState(0); //stores total seconds passed during a session

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const currIntervalRef = useRef(currInterval);
  const sessionTimeRef = useRef(sessionTime);

  function getCurrentDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns a zero-based index
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  async function sendSessionToDb() {
    try {
      const session_date = getCurrentDate();
      const duration_minutes = Math.floor(sessionTimeRef.current / 60);
      console.log(
        `Session Date: ${session_date}, Duration: ${duration_minutes} minutes`
      );

      const body = { session_date, duration_minutes };
      const response = await fetch("http://localhost:3000/session/create", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to send session data");
      }

      const data = await response.json();
      console.log("Session data successfully sent:", data);
    } catch (error) {
      console.error("Error sending session data: ", error.message);
    }
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);

    sessionTimeRef.current++;
    setSessionTime(sessionTimeRef.current);
  }

  function switchMode() {
    if (modeRef.current === "work") {
      currIntervalRef.current++;
      setCurrInterval(currIntervalRef.current);

      if (currIntervalRef.current == props.numIntervals) {
        //weve completed the number of intervals required for a long break

        //if the user is authenticated, then post this session (date and duration minutes) to rest api
        props.isAuthenticated && sendSessionToDb();

        //then reset the total session time
        sessionTimeRef.current = 0;
        setSessionTime(0);

        currIntervalRef.current = 0;
        setCurrInterval(0);

        const nextMode = "long-break";
        const nextSeconds = props.longBreakMinutes * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
        return;
      }
    }

    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work" ? props.workMinutes : props.breakMinutes) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function initTimer() {
    modeRef.current = "work"; // Initialize the mode to work
    setMode("work");

    secondsLeftRef.current = props.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    setIsPaused(true); // Pause the timer
    isPausedRef.current = true;

    currIntervalRef.current = 0;
    setCurrInterval(0);
  }

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        //if paused do nothing
        return;
      }

      if (secondsLeftRef.current === 0) {
        //if time is up then switch to the other mode
        return switchMode();
      }

      tick(); //otherwise decrement a second
    }, 1000);

    return () => clearInterval(interval);
  }, [
    props.workMinutes,
    props.breakMinutes,
    props.longBreakMinutes,
    props.numIntervals,
  ]);

  let totalSeconds = null;
  if (mode === "work") {
    totalSeconds = props.workMinutes * 60;
  } else if (mode === "break") {
    totalSeconds = props.breakMinutes * 60;
  } else if (mode === "long-break") {
    totalSeconds = props.longBreakMinutes * 60;
  }

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return (
    <div className="timer-container">
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: colorMap[mode],
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div className="timer-btn-container" style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton
            setIsPausedToFalse={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          ></PlayButton>
        ) : (
          <PauseButton
            setIsPausedToTrue={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          ></PauseButton>
        )}
      </div>
      <div className="settings-btn-container" style={{ marginTop: "20px" }}>
        <SettingsButton
          setShowSettingsModal={props.setShowSettingsModal}
        ></SettingsButton>
      </div>
    </div>
  );
};

export default Timer;
