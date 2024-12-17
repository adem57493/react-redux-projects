import { forwardRef ,useImperativeHandle,useRef} from "react"//forward ref bileşene dışardan referans geçirmemizi sağlar bileşenin içerdiği dialog elementine doğrudan erişim sağlamak için kullanılır
const ResultModal=  forwardRef(function ResultModal({result,targetTime},ref){
//ref parametresi forwardref aracılığıyla ResultModal'a geçer ve dialog elementine atanır
 const dialog=useRef()

useImperativeHandle(ref,()=>{//useImperativeHandle, dışarıya açılacak fonksiyonları belirliyor.
    return{//ilk argüman olan ref dışardan gelen referansı temsil eder
        open(){
         dialog.current.showModal();
        }//open() fonksiyonu, dışarıdan çağrılabiliyor ve bu fonksiyon çalıştırıldığında dialog.current.showModal() ile modal açılıyor.
    }
})
    return (//ref <dialog> elementine atanmış böylece bileşeni kullanan kişi ref.current ile dialog üstünde işlem yapabilir
        <dialog ref={ref} className="result-modal" >
        <h2>You {result}</h2>
        <p>The target time was <strong>{targetTime}seconds</strong></p>
        <p>You stopped the timer with <strong>X seconds left</strong></p>
 
        <form method="dialog">
            <button>Close</button>
        </form>
        </dialog>
    )
})
// <form method="dialog"> yalnızca dialog içinde kullanılan bir özelliktir dialog kutusunu kapatmaya yarar

export default ResultModal;


/**ResultMoadal içindeki <dialog> elementine dışardan erişip showModal ile açmak için forwardRef kullandık
 * TimerChallenge bileşeni içindeki dialog.current ifadesi, ResultModal bileşenindeki <dialog> elementini temsil ediyor.
 * dialog.current.showModal() ifadesini çağırdığında, doğrudan ResultModal içindeki <dialog> elementini açabiliyor.
 * TimerChallenge'da ref oluşturuyoruz ve bu ref'i ResultModal'a geçiyoruz.
 */