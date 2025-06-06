import {createSlice} from '@reduxjs/toolkit';




const cartSlice=createSlice({
    name:'cart',
    initialState:{
     items:[],
     totalQuantity:0,
     changed:false
    },
    reducers:{
        replaceCart(state,action){
         state.totalQuantity=action.payload.totalQuantity;
         state.items=action.payload.items;
        },
     addItemToCart(state,action){
        const newItem=action.payload;
        const existingItem=state.items.find(item=>item.id==newItem.id);
        state.totalQuantity++;
        state.changed=true;
        if(!existingItem){
            state.items.push({
                id:newItem.id,
                price:newItem.price,
                quantity:1,
                tottalprice:newItem.price,
                name:newItem.title
            })
        }
        else{
            existingItem.quantity++;
            existingItem.totalPrice=existingItem.totalPrice+newItem.price
        }
     },
     removeItemFromCart(state,action){
        const id=action.payload;
        const existingItem=state.items.find(item=>item.id==id);
        state.totalQuantity--;
        state.changed=true;
        if(existingItem.quantity==1){
         state.items=state.items.filter(item=>item.id!==id)
        }else{
            existingItem.quantity--;
            existingItem.totalPrice=existingItem.totalPrice-existingItem.price
        }
     }
    }
})
//CART=SEPET,CARD=OYUN KARTI

 export const sendCartData=(cart)=>{
    return async (dispatch)=>{
        dispatch(
            uiActions.showNotification({
                status:'pending',
                title:'Sending...',
                message:'Sending cart data!'
            })
        )
            const sendRequest=async ()=>{
                const response=await fetch(' https://ffff-dc4b1-default-rtdb.firebaseio.com/cart.json',{
                    method:'PUT',
                   body:JSON.stringify(cart),
                 });
            
                 if(!response.ok){
                 throw new Error('Sending cart data failed.')
                 }
            }
             try{
          await sendRequest();
          dispatch(uiActions.showNotification({
            status:'succes',
            title:'Success!',
            message:'Sent cart data successfully!'
          }))}
          catch(error){
             dispatch(
                  uiActions.showNotification({
                    status:'error',
                    title:'Error',
                    message:'Sending cart data failed'
                  })
                )
          }
             
    }
};

export default cartSlice;
export const cartActions=cartSlice.actions;