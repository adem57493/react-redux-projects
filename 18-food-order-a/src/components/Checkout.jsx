import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import useHttp from '../hooks/useHttp.js';

const requestConfig={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
  

}
export default function Checkout(){


const cartCtx=useContext(CartContext);
const userProgressCtx=useContext(UserProgressContext);

const {data,isLoading:isSending,error,sendRequest,clearData} =useHttp('http://localhost:3000/orders',requestConfig)
const cartTotal=cartCtx.items.reduce(
    (totalPrice,item)=>totalPrice+ item.quantity*item.price,0
)

function handleClose(){

    userProgressCtx.hideCheckOut();
}

function handleFinish(){
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData();
}

function handleSubmit(event){
event.preventDefault();
const fd=new FormData(event.target);
const customerData=Object.fromEntries(fd.entries());//bu kullanıcı tarafından girilen değerleri içeren anahtar değer çiftlerini verecektir={email:test@example.com}

sendRequest(JSON.stringify({
    order:{
    items:cartCtx.items,//kullanıcının alışveriş sepetindeki ürünleri temsil eder
    customer:customerData//Formdan gelen kullanıcı bilgilerini içeren nesnedir (örneğin, email ve ad).
}}));



}

let actions=(
    <> <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
    
    </>
)
if(isSending){
    actions=<span>Sending order data...</span>
}

if(data && !error){
    return <Modal open={userProgressCtx.progress=='checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes</p>
        <p className="modal-actions">
            <Button onClick={handleFinish}>Okay</Button>
        </p>
    </Modal>
}
return <Modal open={userProgressCtx.progress=='checkout'} onClose={handleClose}>
 <form onSubmit={handleSubmit}>
    <h2>Checkout</h2>
    <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
    <Input label="Full Name" type="text" id="name"/>
    <Input label="E-Mail Address" type="email" id="email"/>
    <Input label="Street" type="text" id="street"/>

    <div className="control-row">
        <Input label="Postal Code" type="text" id="postal-code"/>
        <Input label="City" type="text" id="city"/>
    </div>

    {error && <Error title="Failed to submit order" message={error}/>}
    <p className="modal-actions">
       {actions}
    </p>
  </form>
 
</Modal>


}




//CART=SEPET
//CHECKOUT=KASA