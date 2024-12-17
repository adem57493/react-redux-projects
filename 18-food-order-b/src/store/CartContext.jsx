import { createContext, useReducer } from "react";

const CartContext=createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{}
});

function cartReducer(state,action){
    /**action, aşağıdaki gibi bir nesnedir:


{
  type: 'ADD_ITEM',  // Yapılacak işlemin türünü belirler
  item: { id: 'p1', name: 'Product 1', price: 10 } // ADD_ITEM için eklenen ürün verileri
}
  
Bu nesne, dispatch fonksiyonu kullanılarak reducer'a gönderilir. Örneğin:


dispatch({ type: 'ADD_ITEM', item: { id: 'p1', name: 'Product 1', price: 10

. action.type 'ADD_ITEM' olur ve action.item sepete eklemek istediğimiz ürünü taşır.


*/
    if(action.type=='ADD_ITEM'){//existing=mevcut
     const existingCartItemIndex=state.items.findIndex((item)=>item.id==action.item.id);
//findIndex bulamazsa (-) döner,varsa indexi döner
//state.items: Sepetteki mevcut ürünlerin listesi.
//findIndex:
//Sepette action.item.id ile aynı id'ye sahip bir ürün olup olmadığını kontrol eder.
    const updatedItems=[...state.items];
//ürün zaten varsa
     if(existingCartItemIndex>-1){
        const existingItem=state.items[existingCartItemIndex];//mevcut ürün
    const updatedItem={...existingItem,
        quantity:existingItem.quantity+1
    }
    updatedItems[existingCartItemIndex]=updatedItem;
     }
    
     else{
        /**action.item:

Kullanıcının sepete eklemek istediği yeni ürünü temsil eder. Bu, genellikle bir nesnedir ve şu şekilde görünebilir:

{ id: 101, name: "T-shirt", price: 20 } */

/**Diyelim ki sepette şu ürünler var:

javascript
Kodu kopyala
state.items = [
  { id: 1, name: "Laptop", price: 1000, quantity: 1 },
  { id: 2, name: "Mouse", price: 50, quantity: 2 }
];
Şimdi kullanıcı, action.item ile yeni bir ürün eklemek istiyor:

javascript
Kodu kopyala
action.item = { id: 3, name: "Keyboard", price: 150 }; */
     updatedItems.push({...action.item,quantity:1})
     }

     return {...state,items:updatedItems};//// Mevcut state'in diğer özellikleri korunur
    }// items özelliği güncellenmiş listeyle değiştirilir
    /**Eski state:

javascript
Kodu kopyala
state = {
  items: [
    { id: 1, name: "Laptop", price: 1000, quantity: 1 },
    { id: 2, name: "Mouse", price: 50, quantity: 2 }
  ],
  totalAmount: 1150
};
updatedItems:

javascript
Kodu kopyala
updatedItems = [
  { id: 1, name: "Laptop", price: 1000, quantity: 1 },
  { id: 2, name: "Mouse", price: 50, quantity: 3 } // Mouse miktarı arttı
];
Return işlemi sonrası yeni state:

javascript
Kodu kopyala
{
  items: updatedItems, // Güncellenmiş ürün listesi
  totalAmount: 1150    // Eski state'in diğer özellikleri korunur
} */
    if(action.type=='REMOVE_ITEM'){//öğeyi kaldırırken id'sine ihtiyaç var öğenin kendisine ihtiyaç yok 
        const existingCartItemIndex=state.items.findIndex((item)=>item.id==action.item.id);
        const existingCartItem=state.items[existingCartItemIndex];
        const updatedItems=[...state.items];
        if(existingCartItem.quantity===1){
           /**existingCartItemIndex:
Bu, kaldırılacak elemanın dizideki indeksidir.
1:
Bu, splice'ın ilgili indeksten itibaren 1 eleman kaldıracağını belirtir. */
            updatedItems.splice(existingCartItemIndex,1);

        }else{
            const updatedItem={...existingCartItem,quantity:existingCartItem.quantity-1}
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        return {...state,items:updatedItems}
      

    }

    if(action.type=='CLEAR_CART'){
      return {...state,items:[]}
    }
    return state;/**gelen action.type bu türlerden hiçbirine uymuyorsa 'REMOVE_ITEM VEYA ADD_ITEM', mevcut state'i olduğu gibi geri döndürmek gerek */
}
/**action, dispatch fonksiyonuyla sağlanır. Bu fonksiyon genellikle şöyle çağrılır:


dispatch({ type: 'ADD_ITEM', item: { id: 'p1', name: 'Product 1', price: 10 } }) */
export  function CartContextProvider({children}){
  const [cart,dispatchCartAction] = useReducer(cartReducer,{items:[]})//cartReducer'ı pointer olarak veririz onu çağırmayız
 //dispatchCartAction:
//Reducer'a bir action göndermek için kullanılır.
  function addItem(item){/**Bu fonksiyon, yeni bir ürünü sepete eklemek için bir action oluşturur ve dispatchCartAction ile reducer'a gönderir */
    dispatchCartAction({type:'ADD_ITEM',item})//item:item'ın kısa hali direkt item yaz
  };
  function removeItem(id){
    dispatchCartAction({type:'REMOVE_ITEM',id})
  };
  function clearCart(){
    dispatchCartAction({type:'CLEAR_CART'})
  }

  const cartContext={
    items:cart.items,
    addItem,
    removeItem,
    clearCart
  }
  console.log(cartContext);
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;


