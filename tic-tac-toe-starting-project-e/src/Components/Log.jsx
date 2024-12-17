export default function Log({turns}){


    return(//ol'e id veriyoruz böylece css verebiliriz
        <ol id="log">
            {turns.map((turn)=>(
                <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row},{turn.square.col}</li>
            ))}
        </ol>
    )
}/**


const row = 2;
const col = 3;
const key = `${row}${col}`; // "23" sonucunu verir

u durumda, turn.square.row ve turn.square.col değerlerini string olarak birleştiriyoruz.
 Örneğin, turn.square.row = 2 ve turn.square.col = 3 ise, key="23" olacaktır.*/