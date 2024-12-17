import { useState } from "react";
import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
function App() {
  
log('<App/>rendered');

const [enteredNumber,setEnteredNumber]=useState(0);//Bu state, kullanıcının input alanına yazdığı sayıyı tutar.
const [chosenCount,setChosenCount]=useState(0);/**Bu state ise kullanıcının ayarladığı ve sayaç bileşenine
 gönderilecek olan değeri tutar. Bu da başlangıçta 0'dır. */

function handleChange(event){
  setEnteredNumber(+event.target.value);/**
  event.target.value bir string'dir. Bu string'i sayıya çevirmek için başına + işareti koyulur. */
}

function handleSetClick(){// - "Set" Butonuna Tıklandığında Çalışan Fonksiyon
  setChosenCount(enteredNumber);
  setEnteredNumber(0);//: Input alanı boş görünmesi için bu state tekrar 0 olarak güncellenir.
}
  return (
  <>
  <Header/>
  <main>
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber}/>
      <button onClick={handleSetClick}>Set</button>
    </section>
    <Counter initialCount={chosenCount}/>
  </main>
  </>
  )
}

export default App;
