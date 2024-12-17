import { useReducer } from "react";
export function counterReducer(state,action) {//counterReducer: Bu bir "reducer" fonksiyonu. Reducer fonksiyonları, state ve action alır, verilen action'a göre yeni bir state döner
 // state: Mevcut state (durum). Başlangıç değeri useReducer'de { count: 0 } olarak ayarlandığı için başlangıçta { count: 0 } olacaktır.
 //action: Bu parametre, dispatch fonksiyonu ile reducer'a iletilen bir nesnedir ve genelde bir type (eylem türü) 
  if(action.type=='INCREMENT'){
      return{count:state.count+1}
  }
  else if(action.type=='DECREMENT'){
       return{count:state.count-1}
  }
      
      else if(action.type=='RESET'){
          return {count:0}
          
      }
      return state;
  }

//useReducer: React'in useReducer hook'u, bir state ve o state'i değiştirmek için bir dispatch fonksiyonu sağlar.2. parametre reducer() fonksiyonunun başlangıç değeridir
function App() {//counterState başlangıçta {count:0} ile başlar
  //dispatchCounterAction:Eylemleri (action) dispatch ederek reducer'ı tetikler.
const [counterState,dispatchCounterAction]=  useReducer(counterReducer,{count:0})
return (
  <div id="app">
    <h1>The (Final?) Counter</h1>
    <p id="actions">
      
      <button onClick={()=>dispatchCounterAction({type:'INCREMENT'})}>Increment</button>
      <button onClick={()=>dispatchCounterAction({type:'DECREMENT'})}>Decrement</button>
      <button onClick={()=>dispatchCounterAction({type:'RESET'})}>Reset</button>
    </p>
    
    <p id="counter">{counterState.count}</p>
  </div>
);
}//butona tıklandığında, dispatchCounterAction fonksiyonu INCREMENT eylemini reducer'a gönderir. Reducer da state'in count değerini 1 artırır.

export default App;
