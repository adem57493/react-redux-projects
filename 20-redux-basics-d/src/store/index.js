import {createSlice,configureStore} from '@reduxjs/toolkit';/**
 * createSlice: Redux Toolkit'in bir özelliğidir. Bir dilim (slice) oluşturur, 
bu da bir Redux state'inin bir parçasını tanımlamak için kullanılır.
 */

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

const initialAuthState={
    isAuthenticated:false,

}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){//mevcut durum parametre olan (state) redux tarafından otomatik olarak sağlanır
          state.isAuthenticated=true
        },
        logout(state){
         state.isAuthenticated=false
        }
    }
})


const store=configureStore({
    reducer:{auth:authSlice.reducer,counter:counterSlice.reducer}//reducer: Mağazanın nasıl çalışacağını belirler.
    //  Burada counterSlice.reducer, dilime ait tüm reducers işlemlerini mağazaya bağlar.
});

export const counterActions=counterSlice.actions/**
counterSlice.actions: Dilimde tanımlanan tüm işlemler (increment, decrement, increase, toggleCounter) otomatik olarak oluşturulur.
Bu işlemler, bileşenlerde kullanılmak üzere dışa aktarılır. */

export const authActions=authSlice.actions
export default store;//başka bileşenler mağazayı kullanabilsin

