import { useState,useEffect } from "react"
export default function QuestionTimer({timeout,onTimeOut}){
    const [remainingTime,setRemainigTime]=useState(timeout)


    useEffect(()=>{//sistem tarafından tetiklenen bir fonks olduğundan useEffect kullanılır
        console.log('SETTING TIME OUT')
       const timer= setTimeout(()=>{
            onTimeOut()//timeout süresinde cevap verilmezse handleSkipAnswer çağırılarak soru atlanıyor
        },timeout)

        return()=>{
            clearTimeout(timer)
        }
    
    },[timeout,onTimeOut])//bu useEffect timeout veya onTimeOut değitiğinde yeniden çalışacaktır timeout süresi değişirse yeni bir timer başlatılır
   useEffect(()=>{
    console.log('SETTING INTERVAL')
    const interval= setInterval(()=>{
        setRemainigTime((prevRemainingTime=>prevRemainingTime-100))
    },100)

    return ()=>{
    clearInterval(interval)
    }
   },[])//bu useeffect bileşen ilk render edilidiğinde çağrılır
    return(
        <progress id="question-time" max={timeout} value={remainingTime}/>
    )
}