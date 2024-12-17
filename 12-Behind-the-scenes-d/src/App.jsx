/**MİLLİON.JS SAYFASINA GİT REACT UYGULAMASININ HIZINI ARTIRMAK İÇİN TERMİNAL KODUNU TERMİNALDE 
 * ÇALIŞTIR MİLLİON.JS SAYFASINDAKİ vite.config.js'i KOPYALA PROJEDEKİ VİTEKONFİG.JS KODUNU SİL BUNU KOY
 * 
 * 
 */
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
  setChosenCount((prevChosunCount)=>prevChosunCount+1)//zamanlandı çünkkü arrow func olarak kullanıldı
  console.log(chosenCount)// won't work bir sonraki satırda güncellenmiş değeri kullanabileceğimiz bir yanılgıdır çünkü bu durum güncellemesi react tarafından zamanlanıyor
}//aynı fonksiyondan tetiklenen birden fazla state bir araya getirilir ve yalnızca bir bileşen fonksiyonunun yürütülmesine izin verilir(App)
  return (
  <>
  <Header/>
  <main>
    <ConfigureCounter onSet={handleSetCount}/>
    
    <Counter key={chosenCount} initialCount={chosenCount}/> 
    <Counter initialCount={0}/>
  </main>
  </>//normalde nemo kullanmadan sayaç değerini değişridiğimde app bileşenindeki tüm bileşenler yeniden çağrılıyordu buna gerek yok nemo kullanınca eski değerle aynıysatekrar çağrılmıyor
  )
}

export default App;
