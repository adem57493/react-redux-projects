import { useState } from "react";
import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";
function App() {
  
log('<App/>rendered');

const [chosenCount,setChosenCount]=useState(0)

function handleSetCount(newCount){
  setChosenCount(newCount);
}
  return (
  <>
  <Header/>
  <main>
    <ConfigureCounter onSet={handleSetCount}/>
    
    <Counter initialCount={chosenCount}/> 
  </main>
  </>//normalde nemo kullanmadan sayaç değerini değişridiğimde app bileşenindeki tüm bileşenler yeniden çağrılıyordu buna gerek yok nemo kullanınca eski değerle aynıysatekrar çağrılmıyor
  )
}

export default App;
