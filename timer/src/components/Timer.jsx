import { useEffect, useRef, useState } from "react";

export const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [customBtn, setCustomBtn] = useState("Start");
  const timerRef = useRef();

  const timerStart = () => {
    setIsActive(true);
    setCustomBtn("Stop");
  };
  const timerStop = () => {
    setIsActive(false);
    setCustomBtn("Start");
  };

  const timerReset = () => {
    setIsActive(false);
    setCustomBtn("Start");
    setSeconds(0);
    setHours(0);
    setMinutes(0);
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((pre) => (pre + 1) % 60);
        if (seconds == 59) {
          setMinutes((pre) => (pre + 1) % 60);
        }
        if (seconds == 59 && minutes == 59) {
          setHours((pre) => pre + 1);
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, seconds, minutes, hours]);

  return (
    <>
      <p id="timer">
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </p>
      <button onClick={!isActive ? timerStart : timerStop}>{customBtn}</button>

      <button onClick={timerReset}>Reset</button>
    </>
  );
};
