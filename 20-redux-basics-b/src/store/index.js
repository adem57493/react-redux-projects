
import {createStore} from 'redux';//createStore bir redux mağazası oluşturmak için kullanılır,mağaza uygulama durumunu tutar
//redux uygulamanın state yönetimini merkezi bir store'da tutar
const initialState={counter:0,showCounter:true}
const counterReducer=(state=initialState,action)=>{

    if(action.type=='increment'){
       // state.counter++ bu kesinlikle yanlış çünkü mevcut state değeri değiştirilmez yerine yeni bir durum nesnesi döndürülür bu öngörülemeyen hatalara neden olur
        return{
            counter:state.counter+1,
            showCounter:state.showCounter
        }
    }
    if(action.type=='decrement'){
        return{
            counter:state.counter-1,
            showCounter:state.showCounter
        }
    }

    if(action.type=='increase'){
        return{
            counter:state.counter+action.amount,
            showCounter:state.showCounter
        }
    }

    if(action.type=='toggle'){
        return{
            showCounter:!state.showCounter,
            counter:state.counter
        }
    }
    return state;//eğer 2'si de değilse mevcut durumu dönsün
}
const store=createStore(counterReducer);//counterReducer mağazanın nasl çalışacağını belirleyen reducer

export default store;//başka bileşenler mağazayı kullanabilsin

