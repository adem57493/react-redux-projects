import { useState,useEffect } from "react"
export default function QuestionTimer({timeout,onTimeOut,mode}){
    const [remainingTime,setRemainigTime]=useState(timeout)


    useEffect(()=>{
        console.log('SETTING TIME OUT')
       const timer= setTimeout(()=>{
            onTimeOut()
        },timeout)

        return()=>{
            clearTimeout(timer)
        }
    
    },[timeout,onTimeOut])//bu useEffect timeOut veya onTimeOut değiştiğinde yeniden çağrılacaktır
   useEffect(()=>{
    console.log('SETTING INTERVAL')
    const interval= setInterval(()=>{
        setRemainigTime((prevRemainingTime=>prevRemainingTime-100))
    },100)

    return ()=>{
    clearInterval(interval)
    }
   },[])//bu useEffect bileşen ilk render edildiğinde çağrılacaktır,zaten süreyi kendisi otamatik azaltıyor
    return(
        <progress id="question-time" max={timeout} value={remainingTime} className={mode}/>
    )
}