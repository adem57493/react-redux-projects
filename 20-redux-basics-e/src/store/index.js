import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';/**
 * createSlice: Redux Toolkit'in bir özelliğidir. Bir dilim (slice) oluşturur, 
bu da bir Redux state'inin bir parçasını tanımlamak için kullanılır.
 */



const store=configureStore({
    reducer:{auth:authReducer,counter:counterReducer}//reducer: Mağazanın nasıl çalışacağını belirler.
    //  Burada counterSlice.reducer, dilime ait tüm reducers işlemlerini mağazaya bağlar.
});

/**
counterSlice.actions: Dilimde tanımlanan tüm işlemler (increment, decrement, increase, toggleCounter) otomatik olarak oluşturulur.
Bu işlemler, bileşenlerde kullanılmak üzere dışa aktarılır. */

export default store;//başka bileşenler mağazayı kullanabilsin

