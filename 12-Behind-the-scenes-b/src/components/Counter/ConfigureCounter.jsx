import { useState } from "react";
import { log } from "../../log";
export default function ConfigureCounter({onSet}){
    log('<ConfigureCounter/>',1)//1. seviye olacak çünkü uygulamanın 1. seviyesi altında
    const [enteredNumber,setEnteredNumber]=useState(0);//Bu state, kullanıcının input alanına yazdığı sayıyı tutar.
   
    
    function handleChange(event){
      setEnteredNumber(+event.target.value);/**
      event.target.value bir string'dir. Bu string'i sayıya çevirmek için başına + işareti koyulur. */
    }
    
    function handleSetClick(){// - "Set" Butonuna Tıklandığında Çalışan Fonksiyon
      onSet(enteredNumber);
      setEnteredNumber(0);//: Input alanı boş görünmesi için bu state tekrar 0 olarak güncellenir.
    }

    return(
        <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber}/>
      <button onClick={handleSetClick}>Set</button>
    </section>
    )
}