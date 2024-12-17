import { forwardRef ,useImperativeHandle,useRef} from "react"//forward ref bileşene dışardan referans geçirmemizi sağlar bileşenin içerdiği dialog elementine doğrudan erişim sağlamak için kullanılır
import {createPortal} from 'react-dom';
const ResultModal=  forwardRef(function ResultModal({targetTime,remainingTime,onReset},ref){
//ref parametresi forwardref aracılığıyla ResultModal'a geçer ve dialog elementine atanır
 const dialog=useRef()

 const userLost=remainingTime<=0
const formattedRemainigtime=(remainingTime/1000).toFixed(2);//biçimlendirilmiş kalan zaman
const score=Math.round((1-remainingTime/(targetTime*1000))*100)

useImperativeHandle(ref,()=>{//useImperativeHandle, dışarıya açılacak fonksiyonları belirliyor.
    return{//ilk argüman olan ref dışardan gelen referansı temsil eder
        open(){
         dialog.current.showModal();
        }//open() fonksiyonu, dışarıdan çağrılabiliyor ve bu fonksiyon çalıştırıldığında dialog.current.showModal() ile modal açılıyor.
    }
})
    return createPortal (//ref <dialog> elementine atanmış böylece bileşeni kullanan kişi ref.current ile dialog üstünde işlem yapabilir
        //ESC tuşuna basılarak da <dialog> elementi kapatılabilir bu yüzden <dialog> etiketine yerleşik onClose özelliğini eklemeli ve bunu onReset ile ilişkilendirmeliyiz
        <dialog ref={dialog} className="result-modal" onClose={onReset} >
        {userLost&&<h2>You lost!</h2>}
        {!userLost&&<h2>Your score:{score}</h2>}
        <p>The target time was <strong>{targetTime}seconds</strong></p>
        <p>You stopped the timer with <strong>{formattedRemainigtime}</strong></p>
        
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
        </dialog>,
        document.getElementById('modal')
    )
})
// <form method="dialog"> yalnızca dialog içinde kullanılan bir özelliktir dialog kutusunu kapatmaya yarar

export default ResultModal;


/**ResultMoadal içindeki <dialog> elementine dışardan erişip showModal ile açmak için forwardRef kullandık
 * TimerChallenge bileşeni içindeki dialog.current ifadesi, ResultModal bileşenindeki <dialog> elementini temsil ediyor.
 * dialog.current.showModal() ifadesini çağırdığında, doğrudan ResultModal içindeki <dialog> elementini açabiliyor.
 * TimerChallenge'da ref oluşturuyoruz ve bu ref'i ResultModal'a geçiyoruz.
 */