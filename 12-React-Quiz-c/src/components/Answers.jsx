import { useRef } from "react"

export default function Answers({answerState,answers,selectedAnswer,onSelect}){

    const shuffledAnswers=useRef()
    if(!shuffledAnswers.current){
        shuffledAnswers.current=[...answers]//başka bir soruya geçtiğimizde zamanlayıcı baştan başlamıyordu bu yüzden başka bir soruya geçtiğimizde questiontimer'ın yeniden oluşmasını sağlamalıyız ve bunları benzersiz kılmak için key propu ekleriz soru değiştiğinde değişecek olan soru indexi
        shuffledAnswers.current.sort(()=>Math.random()-0.5)
    }
  
return(

    
<ul id='answers'>

{shuffledAnswers.current
.map((answer)=>{
    const isSelected=selectedAnswer===answer

    let cssClass='';

    if(answerState=='answered' && isSelected){
        cssClass='selected'
    }
    if((answerState=='correct' || answerState=='wrong')&&isSelected){
        cssClass=answerState;
    }
    return <li key={answer} className='answer'>
    <button onClick={()=>onSelect(answer)} className={cssClass}>{answer}</button>
</li>
})}
</ul>


)
}