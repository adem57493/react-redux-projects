import { useImperativeHandle,forwardRef,useRef } from "react";
import {createPortal} from 'react-dom';
import Cart from './Cart.jsx'
const CartModal=forwardRef(function CartModal({cartItems,onUpdateCartItemQuantity,title,actions},ref){

 const dialog=useRef()

 useImperativeHandle(ref,()=>{
    return{
        open:()=>{
            dialog.current.showModal();
        }
    }
 })
    return createPortal(

       <dialog id="modal" ref={dialog}>
        <h2>{title}</h2>
        <Cart items={cartItems} onUpdateCartItemQuantity={onUpdateCartItemQuantity}/>
        <form method="dialog" id="modal-actions">
           {actions}
        </form>
       </dialog>,document.getElementById('modal')

    )
})

export default CartModal;