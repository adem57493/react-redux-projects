import {useState} from 'react';

const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null]

]


// export default function GameBoard(){//GameBoard bileşenini initialgameboard üzerinde döngü yaparak oluşturuyoruz


//     return <ol id="game-board">
//         {initialGameBoard.map((row,rowIndex)=>(// row her satırı temsil ediyor,rowIndex o satırın indexini
//             <li key={rowIndex}>
//             <ol>
//                 {row.map((playerSymbol,colIndex)=>(
//                     <li key={colIndex}>
//                         <button>{playerSymbol}</button>
//                         </li>
//                         ))}
//                         </ol>
//         </li>))}
//     </ol>
//     );//key={rowIndex} her satırı temsil eden li'ye uygulanıyor satırları benzersiz kılar
// }//key={colIndex} herbir hücreye uygulanır hücreleri benzersiz kılar
 

{/* <ol id="game-board">yukardaki kısaltması
  <li>
    <ol>
      <li><button>null</button></li>
      <li><button>null</button></li>
      <li><button>null</button></li>
    </ol>
  </li>
  <li>
    <ol>
      <li><button>null</button></li>
      <li><button>null</button></li>
      <li><button>null</button></li>
    </ol>
  </li>
  <li>
    <ol>
      <li><button>null</button></li>
      <li><button>null</button></li>
      <li><button>null</button></li>
    </ol>
  </li>
</ol> */}



export default function GameBoard({onSelectSquare,turns}){//GameBoard bileşenini initialgameboard üzerinde döngü yaparak oluşturuyoruz
 //const[gameBoard,setGameBoard] =useState(initialGameBoard);

// function handleSelectSquare(rowIndex,colIndex){//handleselectsquare=kareyi seçme işlemi,handle=yönetmek kareyi seçme işlemini yönet
// //handleSelectSquare({rowIndex,colIndex}) byle yazmadık çünkü rowIndex,colIndex 2 ayrı değerdir böyle yazsaydık nesne içinde yazmış olurduk
//   setGameBoard((prevGameBoard)=>{
//     const updatedBoard=[...prevGameBoard.map(innerArray=>[...innerArray])]
//     updatedBoard[rowIndex][colIndex]={activePlayerSymbol};
//     return updatedBoard;
//   });

//   onSelectSquare()//butona tıklandığında çalışıcak çünkü bu fonksiyonun içinde tanımladık
// }//prevGameBoard.map() diyerek her satırı işleme alıyoruz ilk spread operatörü dıştaki diziyi kopyalar
//innerArray=>[...innerArray]

/**
 * benim anladığım ...prevGameBoard diyerek 3 satırı bağımsız satırlara dönüştürüyoruz .map diyerek bağımsız satırlar üzerinde geziniyoruz her satıra innerArray diyerek  ...innerArray ile bağımsız hücrelere dönüştürüyoruz
  burda ...(spread operatörü elemanları birbirinden ayırır diziler referansla turulduğundan matrixsin kopyası oluşturulmuş olur  ...innerArray'in dışındaki köşeli parantezle satırların içindekiler köşeli paranteze alınmış oluyor en dıştakiyle de 3 satır köşeli paranteze alınmış oluyor )
*/
 
let gameBoard=initialGameBoard;

for(const turn of turns){//bu döngü herbir hamleyi oyun tahtasına uygular
  const {square,player}=turn;
/**
 * urn adlı nesnenin içindeki belirli özelliklere (yani square ve player) kolayca erişmek için yapılır. Ardından, square nesnesinin içindeki row (satır) ve col (sütun) bilgileri yine aynı yöntemle alınır.
 */
  const {row,col}=square;

  gameBoard[row][col]=player;
}/**
Bu kod parçası, hamleleri oyun tahtasına yansıtmak için kullanılıyor.
 Bu döngü, oyun tahtasına hamlelerin uygulanmasını sağlar. Örneğin, turns dizisinde şu hamleler olabilir:

let turns = [
  { square: { row: 0, col: 1 }, player: 'X' },
  { square: { row: 2, col: 2 }, player: 'O' }
];
*/


/** 
 * varsayalım ki dizi böyle olsun 
 * let turns = [
  { square: { row: 0, col: 1 }, player: 'X' },
  { square: { row: 2, col: 2 }, player: 'O' }
];
 * 
 * 
 */
  return <ol id="game-board">
      {gameBoard.map((row,rowIndex)=>(// row her satırı temsil ediyor,rowIndex o satırın indexini
          <li key={rowIndex}>
          <ol>
              {row.map((playerSymbol,colIndex)=>(
                  <li key={colIndex}>
                      <button onClick={()=>onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                      </li>
                      ))}
                      </ol>
      </li>))}
  </ol>
  ;//key={rowIndex} her satırı temsil eden li'ye uygulanıyor satırları benzersiz kılar
}


        
    
