import { useState ,useRef} from "react"
import ResultModal from "./ResultModal"
//let timer;//burada tanımlarsak yeniden oluşturulmaz
export default function TimerChallange({title,targetTime}){
    const timer=useRef()//ref kullandık çünkü yeniden çalıştığında sıfırlanmayacak şekilde yönetmemiz gerekiyor
    const dialog=useRef()
  const [timerStarted,setTimerStarted]=useState(false)
  const [timerExpired,setTimerExpired]=useState(false)
  //timer expired=zamanlayıcı süresi doldu zamanlayıcının süresinin dolup dolmadığını kontrol eder


    function handleStart(){
      //bu işlev zamanlayıcıyı başlatır setTimeout ile belirtilen targettime süre sonra setTimerExpired(true) çalıştırılarak zamanlayıcının süresinin dolduğu belirtilir
      //timer değişkeni bir ref olarak tanımlandı (yani timer.current). Bu, bileşen yeniden render edildiğinde bile timer.current'in değişmeyeceği anlamına gelir. Eğer let timer gibi bir değişken kullanılsaydı, bileşen yeniden render edildiğinde bu değişken sıfırlanacaktı ve zamanlayıcıyı durdurmak mümkün olmayacaktı
      timer.current= setTimeout(()=>{
        setTimerExpired(true)//dialog.current <ResultModal> içindeki <dialog> elementini gösterir bu şekilde dialog.current.showModal deyip dom metotlarına erişebiliyoruz
        dialog.current.open()//<dialog> elementine özgü olan showModal çağrılır bu kullanıcının dialogu kapatmadan başka bir yere tıklaması egellenir
       },targetTime*1000)//targetTime sn sonra setTimerExpired  çağrılır,bu kadar sn içinde kullanıcı stopChallenge'a basmazsa timerExpired true olacağından you lost yazar
     //dialog.current demek <dialog> elementini çağırıp içindeki open() metodunu kullanmaktır  imperativeHandle kullanmasaydık direkt burda dialog.current.showModal()
        setTimerStarted(true)
      //setTimeout bir zamanlayıcı başlatır ve belirli bir süre sonra bir işlemi gerçekleştirir. Zamanlayıcı başlatılmadan önce kullanıcıya "zamanlayıcı başlatıldı" demek yanıltıcı olur. Bu nedenle önce zamanlayıcı (setTimeout) başlatılır, ardından "zamanlayıcı başlatıldı" bilgisini güncelleyen setTimerStarted(true) ifadesi çağrılır.
    }

    function handleStop(){
     clearTimeout(timer.current);//aktif olan setTimeout iptal edilir ve zamanlayıcı durdurulur
    }
return(
<>

<ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
 <section className="challenge">

    <h2>{title}</h2>

    <p className="challenge-time">{targetTime} second {targetTime>1?'s':''}</p>
    <p>
        <button onClick={timerStarted?handleStop:handleStart}>{timerStarted?'Stop':'Start'} Challenge</button>
    </p>
    <p className={timerStarted?'active':undefined}>{timerStarted?'Time is running...':'Timer inactive'}</p>
</section>
</>)
/**
 * 
 * ref Kullanımı: useRef, zamanlayıcıyı yeniden render durumlarından bağımsız olarak tutar. Eğer bir değişkeni useRef ile tutmasaydık ve örneğin let timer kullanılsaydı,
 *  her render sonrası timer'ın değeri sıfırlanırdı ve zamanlayıcı düzgün çalışmazdı.
 */
}