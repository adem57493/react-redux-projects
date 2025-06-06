import { useRef } from "react";
import CartModal from './CartModal.jsx';

export default function Header({cart,onUpdateCartItemQuantity}){

   const cartQuantity=cart.items.length//sepetteki ürün sayısı
  const modal=useRef()


  function handleOpenCartClick(){
    modal.current.open();
  }

  let modalActions=<button>Close</button>

  if(cartQuantity>0){
    modalActions=(
        <>
        <button>Close</button>
        <button>Checkout</button>
        </>
    )
  }

    return(
       
     <>
      <CartModal ref={modal} cartItems={cart.items} onUpdateCartItemQuantity={onUpdateCartItemQuantity} title=" your card" actions={modalActions}/>
     <header id="main-header">
        <div id="main-title">
        <img src="logo.png" alt="Elegant Model" />
        <h1>Elegant Context</h1>
        </div>
        <p>
            <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
            </p>
     </header>
     </>


    )
}