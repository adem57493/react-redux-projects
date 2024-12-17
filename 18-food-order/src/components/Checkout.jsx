import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
export default function Checkout(){


const cartCtx=useContext(CartContext);
const userProgressCtx=useContext(UserProgressContext);
const cartTotal=cartCtx.items.reduce(
    (totalPrice,item)=>totalPrice+ item.quantity*item.price,0
)

function handleClose(){

    userProgressCtx.hideCheckOut();
}

function handleSubmit(event){
event.preventDefault();
const fd=new FormData(event.target);
const customerData=Object.fromEntries(fd.entries());//bu kullanıcı tarafından girilen değerleri içeren anahtar değer çiftlerini verecektir={email:test@example.com}

fetch('http://localhost:3000/orders',{//bu nesne fetch fonskiyonuna isteğin detaylarını belirtir
    method:'POST',//fetch metodu sunucuya veri göndermek için kullanılır
    headers:{
        'Content-Type':'application/json'//application/json formatında veri gönderileceğini belirtir
    },
    body:JSON.stringify({//sunucuya gönderilecek veriler,JSON.stringfy ile nesne JSON formatına dönüştürülür sunucu JSON formatında veri bekler
        order:{
            items:cartCtx.items,//kullanıcının alışveriş sepetindeki ürünleri temsil eder
            customer:customerData//Formdan gelen kullanıcı bilgilerini içeren nesnedir (örneğin, email ve ad).
        }
    })
})


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
    <p className="modal-actions">
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
    </p>
  </form>
 
</Modal>


}




//CART=SEPET
//CHECKOUT=KASA