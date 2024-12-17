import { createContext ,useReducer} from "react";//createContext bileşenler arası veri paylaşımını sağlar
import { DUMMY_PRODUCTS } from "../dummy-products";

 export const CartContext=createContext({items:[],addItemtoCart:()=>{},updateItemQuantity:()=>{}})//boş bir ürün listesi ve varsayılan olarak boş bir fonksiyon bu fonksiyon sepete ürün eklemek için kullanılacak
 //CartContext bir alışveriş sepetiyle ilgili bilgileri sepetteki ürünler ve sepete ürün ekleme fonksiyonu tüm uygulamada paylaşmak amacıyla kullanılır
 /**
  * CartContext genellikle Context.Provider ile bir bileşen ağacının etrafına sarılır. Bu sayede, bu bileşenin altındaki her bileşen CartContext'ten veriyi 
  * kolayca alabilir veya güncelleyebilir.
  */

 function shoppingCartReducer(state,action){
  if(action.type==='ADD_ITEM'){
    const updatedItems=[...state.items];//bu, mevcut (önceki) alışveriş sepetindeki ürünlerin listesini temsil eder.
    /**
     * prevShoppingCart.items = [
    { id: '123', name: 'Laptop', price: 1500, quantity: 1 },
    { id: '456', name: 'Phone', price: 800, quantity: 2 }
  ];
  
     */
  //prevShoppingCart React state'inde tutulan alışveriş sepeti objesidir, ve items onun içindeki ürünleri tutan bir dizidir (liste).
   //existing card item index=mevcut kard ögesi dizini
    const existingCartItemIndex=updatedItems.findIndex((cardItem)=>cardItem.id===action.payload)//eklenmek istenen ürünün sepette olup olamadığı kontrol edilir
  
    const existingCartItem=updatedItems[existingCartItemIndex]//Eğer existingCartItem tanımlıysa, yani ürün zaten sepette mevcutsa, o zaman ürünün miktarı bir artırılır
  
    if(existingCartItem){//bu kod sepette zaten olan bir ürünün miktarını artırmak için yazılmıştır
      const updatedItem={...existingCartItem,quantity:existingCartItem.quantity+1}
      updatedItems[existingCartItemIndex]=updatedItem
    }
    else{//ürün sepette yoksa sepet dizisine eklenir
      const product=DUMMY_PRODUCTS.find((product)=>product.id===action.payload)//sepete eklemek istediğimiz ürünün id'sini biliyoruz ancak diğer özelliklerini bilmiyoruz bu yüzden eklemek istediğimiz ürünün tüm bilgileriini bulmak için bu işlemi yapıyoruz
      updatedItems.push({
        id:action.payload,
        name:product.title,
        price:product.price,
        quantity:1
      })
    }
  
    return{
      ...state,
      items:updatedItems
    }
  }
  if(action.type=='UPDATE_ITEM'){
    const updatedItems=[...state.items]
    const updatedItemIndex=updatedItems.findIndex((item)=>item.id=action.payload.productId)
    const updatedItem={...updatedItems[updatedItemIndex]}

    updatedItem.quantity+=action.payload.amount;

    if(updatedItem.quantity<=0){
      updatedItems.splice(updatedItemIndex,1)//ürün diziden çıkartılır
    }
    else{
      updatedItems[updatedItemIndex]=updatedItem//güncellenen ürün miktarı ile rün dizide güncellenir
    }
    return{
      ...state,
      items:updatedItems//güncellenen sepet durumu geri döndürülür
    }
  }
  
  return state;
 }

 export default function CartContextProvider({children}){

  const [shoppingCartState,shoppingCartDispatch]=useReducer(shoppingCartReducer,{items:[]})
     
//shoppingCart alışveriş sepetindeki ürünlerin listesini içerir
 //id sepete eklemek istediğimiz ürünün kimliğini belirtir
 /**diyelim ki elimizde şu ürünler var
  * const DUMMY_PRODUCTS = [
   { id: '123', title: 'Laptop', price: 1500 },
   { id: '456', title: 'Phone', price: 800 }
 ];
 Bir kullanıcı "123" kimlikli Laptop'u sepete eklemek istiyor.  önce sepette bu id'ye sahip bir ürün olup olmadığını kontrol ediyoruz
 sepet boş olduğu için existingCartItem bulunmaz. Yani, sepette bu üründen daha önce eklenmiş bir tane yok.
 Bu aşamada, ürün şu şekilde sepete eklenir:
 {
   id: '123',
   name: 'Laptop',
   price: 1500,
   quantity: 1
 }
 
  * 
  */
  function handleAddItemToCart(id){//sepete ürün ekleme, eğer sepette o üründen varsa miktarını artırır yoksa sepete ekler
    shoppingCartDispatch({type:'ADD_ITEM',payload:id});

  
 
  
  }
  /**
   * 
   * handleAddItemToCart Fonksiyonu
 Amacı: Sepete yeni bir ürün eklemek veya zaten sepette bulunan bir ürünün miktarını artırmak.
 
 handleUpdateCartItemQuantity Fonksiyonu
 Amacı: Sepetteki mevcut bir ürünün miktarını doğrudan artırmak veya azaltmak.
   */
 
 /**Diyelim ki sepetimizde şu ürünler var:
  * prevShoppingCart.items = [
   { id: '1', name: 'Laptop', price: 1500, quantity: 2 },
   { id: '2', name: 'Phone', price: 800, quantity: 1 }
 ];
  senaryo:Kullanıcı, id: '1' olan Laptop ürününün miktarını 1 azaltmak (yani bir tane çıkarmak) istiyor. Bu durumda productId = '1' ve amount = -1 olacak.
  updatedItems şu an şunu tutar
  [
   { id: '1', name: 'Laptop', price: 1500, quantity: 2 },
   { id: '2', name: 'Phone', price: 800, quantity: 1 }
 ]
 updatedItemIndex=
 Bu satır, productId'ye (yani '1') sahip olan ürünü bulur.
 updatedItemIndex değişkeni, dizideki ürünün sırasını tutar. Bu örnekte updatedItemIndex = 0 olur çünkü Laptop dizinin ilk elemanıdır.
  
 
 updatedItem ile, Laptop ürününün bir kopyasını alırız.
  */
  function handleUpdateCartItemQuantity(productId,amount){//sepetteki ürünün miktarını güncellemek için kullanılır, ürünün miktarı 0 veya daha az olursa ürün sepetten çıkartılır
  //productId güncellenmek istenen ürünün kimliği,amount miktar değişimi (+),(-) olabilir
  shoppingCartDispatch({
    type:'UPDATE_ITEM',
    payload:{
      productId,
      amount
    }
  })
   /** updatedItems şu an şunu tutar[
     { id: '1', name: 'Laptop', price: 1500, quantity: 1 },
     { id: '2', name: 'Phone', price: 800, quantity: 1 }
   ]
    */
  }
 
  const ctxValue={items:shoppingCartState.items,addItemToCart:handleAddItemToCart,updateItemQuantity:handleUpdateCartItemQuantity}
  /**
   * Bu nesne, daha sonra CartContext.Provider ile uygulamanın alt bileşenlerine aktarılacak. Böylece, items (sepet içeriği)
   *  ve addItemToCart işlevi tüm bileşenler tarafından kullanılabilir hale gelecek
   */
  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>

  
 }