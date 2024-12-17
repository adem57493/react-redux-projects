import {useState} from 'react'


export default function App() {
    const [highlighted,setHighlighted]=useState(false)
    
    function clickHandler(){
        setHighlighted(isHighlighted=>!isHighlighted)
    }
   
    return (//ilk {} javascript kodu yazmak için 2. {} parantez css stil kuralları tanımlayan javascript nesnesi react'ın style özelliği bir nesne bekler
        <div>
            <p style={{color:highlighted?'red':'white'} }>Style me!</p>
            <button onClick={clickHandler}>Toggle style</button>
        </div>
    );
}
