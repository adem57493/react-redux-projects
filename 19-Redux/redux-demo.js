//nodejs javascripti tarayıcı(UI) dışında çalıştırmamıza izin verir. Node.js, JavaScript’in tarayıcı dışındaki bir ortamda, yani sunucu tarafında veya komut satırı arayüzünde çalışmasını sağlar

//terminalde NPM İNİT -Y YAZ. bu sorulara yes cevabını veirir ve package.json verir

//NPM İNSTALL REDUX

const redux=require('redux');

const  counterReducer=(state={counter:0},action)=>{//state'e default value vardik

    if(action.type=='increment'){
        return{
            counter:state.counter+1//state.counter-existing state plus 1
        }

    }

    if(action.type=='increment'){
        return{
            counter:state.counter-1
        }
    }

}//reducer fonks her zaman yeni bir durum nesnesi döndürmelidir

const store=redux.createStore(counterReducer);//store hangi reducer'ın o store'u değiştirdiğini bilmek ister bu yüzden parametre olarak verdik şimdi bu mağazaya abone olan birine ihtiyaç var

console.log(store.getState())
const counterSubscriber=()=>{//parametre almaz ancak fonks içinde mağazaya ulaşabilir

const latestState=store.getState()//en son state'e ulaşılır
console.log(latestState);
}

//redux'ı counterSubscriber fonsk'dan haberdar etmemiz gerekir

store.subscribe(counterSubscriber)//counterSubsciber'i çağırmıyoruz ona işaret ediyoruz

// çalıştırmak için NODE REDUX-DEMO.JS

//dispatch =iletmek iletilen ,gönderilen eylem bir objedir

store.dispatch({type:'increment'})
store.dispatch({type:'decrement'})

