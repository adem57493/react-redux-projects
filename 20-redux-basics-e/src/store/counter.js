import {createSlice} from '@reduxjs/toolkit';
/**configureStore: Redux Toolkit ile mağaza (store) oluşturmak için kullanılan bir yardımcı
 *  fonksiyondur. createStore'un daha modern ve sadeleştirilmiş bir alternatifidir. */
//createStore bir redux mağazası oluşturmak için kullanılır,mağaza uygulama durumunu tutar
//redux uygulamanın state yönetimini merkezi bir store'da tutar
const initialCounterState={counter:0,showCounter:true};

const counterSlice=createSlice({//createSlice obje argüman olarak alır
//createSlice ile yaptığımız global state'imizin durumunu hazırlamaktır
name:'counter',//name: Bu dilim için bir ad sağlar ('counter').
initialState:initialCounterState,
reducers:{//dilime ait durum değişikliklerini gerçekleştiren işlemleri tanımlar.

increment(state){
    state.counter++;
},
decrement(state){
    state.counter--;
},
increase(state,action){
    state.counter=state.counter+action.payload;
},
toggleCounter(state){
    state.showCounter=!state.showCounter;
}
}

})

export const counterActions=counterSlice.actions;
export default counterSlice.reducer;