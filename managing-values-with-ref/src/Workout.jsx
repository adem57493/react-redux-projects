import { useRef } from "react";
export default function Workout({title,description,time,onComplete}){

const timer=useRef();/**
 * timer: Zamanlayıcı referansı olarak kullanılır. useRef, yeniden render olduğunda bile aynı referansın korunmasını sağlar.
 Bu, zamanlayıcıyı başlatıp durdurmak için kullanacağımız setTimeout ID'sini saklar.
 */

function handleStartWorkout(){
    console.log(`${title} workout started`)
    timer.current=setTimeout(handleStopWorkout,time)//u, time prop'u kadar (milisaniye cinsinden) bir süre sonrasında handleStopWorkout fonksiyonunu çağırır.
}

function handleStopWorkout(){
    clearTimeout(timer.current)//daha önce başlatılan zamanlayıcı durdurulur.
    console.log(`${title} workout completed`); 
    onComplete()//kullanıcı stop düğmesine bastığı için onComplete()
}

return(
    <article className="workout">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{Math.floor(time / 60000)} dakika</p>
        <p>
            <button onClick={handleStartWorkout}>Start</button>
            <button onClick={handleStopWorkout}>Stop</button>
        </p>
    </article>
)
}