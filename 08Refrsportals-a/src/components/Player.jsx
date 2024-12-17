import { useState,useRef } from "react"//useRef DOM 

export default function Player(){
const playerName=useRef();//playerName bir referans oluşturur bu referans input'a bağlanır ve değerine doğrudan erişim sağlar

const [enteredPlayerName,setEnteredPlayerName]=useState('')


function handleClick(){

setEnteredPlayerName(playerName.current.value);//useRef ile oluşturulan referans üzerinden input elemanının o anki değerine erişilir
playerName.current.value='';
}//useRef ile oluşturulan playerName referansı input alanına bağlanmıştır,playerName.current bu input elemanını temsil eder kullanıcı bir şey yazıp butona tıkladığında input elemanı temizlenir

return(
    <section id="player">
     <h2>Welcome {enteredPlayerName?enteredPlayerName:'unknown entity  '}</h2>
     <p>
        <input ref={playerName} type="text" />
        
        <button onClick={handleClick}>Set Name</button>
    </p>
    </section>
)//useRef ile oluşturulan playerName referansı input alanına bağlanmıştır

}