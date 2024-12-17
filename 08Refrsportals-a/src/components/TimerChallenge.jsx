import { useState ,useRef} from "react"
import ResultModal from "./ResultModal"
//let timer;//burada tanımlarsak yeniden oluşturulmaz
export default function TimerChallange({title,targetTime}){
    const timer=useRef()//ref kullandık çünkü yeniden çalıştığında sıfırlanmayacak şekilde yönetmemiz gerekiyor
    const dialog=useRef()/** */
 
    const [timeRemaining,setTimeRemaining]=useState(targetTime*1000)
  //time remaining=geriye kalan zaman
    const timerIsActive=timeRemaining>0 && timeRemaining<targetTime*1000

    if(timeRemaining<=0){
      clearInterval(timer.current)//zamanlayıcı durdurulur
      dialog.current.open()
    }

    function handleReset(){
      setTimeRemaining(targetTime*1000);
    }
    function handleStart(){
      
    
      timer.current= setInterval(()=>{//setInterval'de örneğin 10mlsn'de bir bu kod çalışır settimeout olsaydı 10mlsn sonra sadece bir kez çalışırdı
     //her 10 milisaniyede bir  timeRemaining değeri 10 milisaniye azaltılıyor.
      setTimeRemaining(prevTimeRemaining=>prevTimeRemaining-10)
       },10)
    
      
     
    }

    function handleStop(){
      dialog.current.open()
     clearInterval(timer.current);
    }
return(
<>

<ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
 <section className="challenge">

    <h2>{title}</h2>

    <p className="challenge-time">{targetTime} second {targetTime>1?'s':''}</p>
    <p>
        <button onClick={timerIsActive?handleStop:handleStart}>{timerIsActive?'Stop':'Start'} Challenge</button>
    </p>
    <p className={timerIsActive?'active':undefined}>{timerIsActive?'Time is running...':'Timer inactive'}</p>
</section>
</>)
/**
 * 
 * ref Kullanımı: useRef, zamanlayıcıyı yeniden render durumlarından bağımsız olarak tutar. Eğer bir değişkeni useRef ile tutmasaydık ve örneğin let timer kullanılsaydı,
 *  her render sonrası timer'ın değeri sıfırlanırdı ve zamanlayıcı düzgün çalışmazdı.
 */
}