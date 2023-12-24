import { useEffect, useRef, useState } from "react"


export const Timer=()=>{

    const [seconds, setSeconds]= useState(0);
    const [isActive,setIsActive]= useState(false);
    const intervalRef= useRef()

    const startTimer= ()=>{
        setIsActive(true)
    }
    const stopTimer= ()=>{
        setIsActive(false)
    }

    const resetTimer=()=>{
        setIsActive(false)
        setSeconds(0)
    }

    useEffect(()=>{
       
        if(isActive){
            intervalRef.current= setInterval(()=>{
                setSeconds((pre)=>pre+1)
            },1000)
        }
        else{
            clearInterval(intervalRef.current)
        }


        return ()=> clearInterval(intervalRef.current)
    },[isActive])


    return(
        <>
        <div>
        <p>Timer: {seconds} seconds</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
        </div>
        </>
    )
}