import React, { useState, useEffect, useRef } from 'react';

export const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const timerRef= useRef()
  const [isActive,setIsActive]= useState(false)


  const timerStart=()=>{
    setIsActive(true)
  }
  const timerStop=()=>{
    setIsActive(false)
  }

  const timerReset=()=>{
    setIsActive(false)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  useEffect(() => {

if(isActive){

    timerRef.current = setInterval(() => {
      // Update seconds
      setSeconds((prevSeconds) => (prevSeconds + 1) % 60);
    
      // Update minutes
      if (seconds === 59) {
        setMinutes((prevMinutes) => (prevMinutes + 1) % 60);
      }
    
      // Update hours
      if (minutes === 59 && seconds === 59) {
        setHours((prevHours) => prevHours + 1);
      }
    }, 1000);
}
else{
    clearInterval(timerRef.current)
}


    // Cleanup interval on component unmount
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  return (
    <div>
      <p id='timer'>{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
      <div>
        <button onClick={timerStart}>start</button>
        <button onClick={timerStop}>stop</button>
        <button onClick={timerReset}>reset</button>
      </div>
    </div>
  );
};


