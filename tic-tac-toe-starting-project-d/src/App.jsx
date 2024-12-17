// import {useState} from 'react';
// import Player from "./Components/Player";
// import GameBoard from "./Components/GameBoard.jsx";
// import Log from './Components/Log.jsx';
// function App() {
//   const [activePlayer,setActivePlayer]=useState('X');

//   function handleSelectSquare(){
    
//     setActivePlayer((curActivePlayer)=>curActivePlayer==='X'?'O':'X')

//   }

//   return (
//    <main>
//     <div id="game-container">
//      <ol id="players" className='highlight-player' >
//      <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'}/>
//      <Player initialName="Player 2" symbol="O"  isActive={activePlayer==='O'}/>
//      </ol>

//      <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
//     </div>
   
//    </main>
//   )
// }

// export default App


import {useState} from 'react';
import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from './Components/Log.jsx';
import './Components/GameOver.jsx'
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './Components/GameOver.jsx';

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]

]

function deriveActivePlayer(gameTurns){//derive=türetmek aktif oyuncuyu türetmek
  let currentPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player=='X'){//player alttaki updatedTurns'dan geliyor
    currentPlayer='O'
  }

  return currentPlayer;
}
function App() {
  const [players,setPlayers]=useState({X:'Player 1',O:'Player 2'})
  const [gameTurns,setGameTurns]=useState([])//GAMETURNS=OYUN TURLARI
  //const [activePlayer,setActivePlayer]=useState('X');
    
  const activePlayer=deriveActivePlayer(gameTurns)

  //derin kopya yapıcaz çünkü rematch'e tıkladığımda orijinal dizi üzerinde çalışıyordu bu yüzden düzgün çalışmıyordu
let gameBoard=[...initialGameBoard.map(array=>[...array])];

for(const turn of gameTurns){//bu döngü herbir hamleyi oyun tahtasına uygular
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
let winner;

  for(const combination of WINNING_COMBINATIONS){

    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
    
    if(firstSquareSymbol&&firstSquareSymbol===secondSquareSymbol&&firstSquareSymbol===thirdSquareSymbol){
      winner=players[firstSquareSymbol];//sembol kazanan olarak atanır
    }
  }

  const hasDraw=gameTurns.length==9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    //   let currentPlayer='X';
   // setActivePlayer((curActivePlayer)=>curActivePlayer==='X'?'O':'X')
    setGameTurns(prevTurns=>{
   
     const currentPlayer=deriveActivePlayer(prevTurns);

      const updatedTurns=[
        {square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevTurns//...prevTurns önceki hamlelerin tümünü diziye ekler böylece en so yapılan hamle listenin başına eklenir
      ];// Bu kod, hamle dizisini her seferinde bir yeni hamle ile günceller. Örneğin:

    //  Başlangıçta prevTurns = [] (boş)
    //  Birinci hamle: { square: { row: 0, col: 0 }, player: 'X' }
    //  İkinci hamle: { square: { row: 1, col: 1 }, player: 'O' }
     // updatedTurns dizisi böylece hamle geçmişini içerir ve her yeni hamle en başa eklenir.
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newName){
   setPlayers(prevPlayers=>{
    return{
      ...prevPlayers,
      [symbol]:newName
    }
   })
  }
  return (
   <main>
    <div id="game-container">
     <ol id="players" className='highlight-player' >
     <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
     <Player initialName="Player 2" symbol="O"  isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
     </ol>
     {/* {winner && <p>You won,{winner}!</p>} */}
     {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
     <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}
      />
    </div>
   <Log turns={gameTurns}/>
   </main>
  )//JavaScript'teki && (mantıksal VE) operatörü, sol tarafındaki ifade doğru (truthy) ise, sağ tarafındaki ifadeyi değerlendirir ve çalıştırır
}

export default App
