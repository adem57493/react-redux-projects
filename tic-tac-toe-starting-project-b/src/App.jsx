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
import { WINNING_COMBINATIONS } from './winning-combinations.js';

function deriveActivePlayer(gameTurns){//derive=türetmek aktif oyuncuyu türetmek
  let currentPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player=='X'){//player alttaki updatedTurns'dan geliyor
    currentPlayer='O'
  }
    
  return currentPlayer;
}
function App() {
  const [gameTurns,setGameTurns]=useState([])//GAMETURNS=OYUN TURLARI
  //const [activePlayer,setActivePlayer]=useState('X');
    
  const activePlayer=deriveActivePlayer(gameTurns)

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

  return (
   <main>
    <div id="game-container">
     <ol id="players" className='highlight-player' >
     <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'}/>
     <Player initialName="Player 2" symbol="O"  isActive={activePlayer==='O'}/>
     </ol>

     <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}
      />
    </div>
   <Log turns={gameTurns}/>
   </main>
  )
}

export default App
