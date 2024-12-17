
import {createStore} from 'redux';//createStore bir redux mağazası oluşturmak için kullanılır,mağaza uygulama durumunu tutar
//redux uygulamanın state yönetimini merkezi bir store'da tutar
const counterReducer=(state={counter:0},action)=>{

    if(action.type=='INCREMENT'){
        return{
            counter:state.counter+1
        }
    }
    if(action.type=='DECREMENT'){
        return{
            counter:state.counter-1
        }
    }
    return state;//eğer 2'si de değilse mevcut durumu dönsün
}
const store=createStore(counterReducer);//counterReducer mağazanın nasl çalışacağını belirleyen reducer

export default store;//başka bileşenler mağazayı kullanabilsin

