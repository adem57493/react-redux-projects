import { useRef ,useContext} from "react";
import CartModal from './CartModal.jsx';
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Header(){

  
  const modal=useRef()
  const {items}=useContext(CartContext)
  const cartQuantity=items.length//sepetteki ürün sayısı

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
      <CartModal ref={modal} title=" your card" actions={modalActions}/>
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