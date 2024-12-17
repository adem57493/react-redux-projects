import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart(){
  const {items,updateItemQuantity}=useContext(CartContext)//CartContext'ten veriyi almak için kullanılır.CartContext'in içinde yer alan items adlı veriyi alır
/**
 * Callback fonksiyonun parametreleri: (acc, item)
acc (akümülatör): Daha önce yapılan işlemlerin sonucunu tutan değerdir. Her adımda güncellenir.
item: Dizideki her bir öğeyi ifade eder.
başlangıç değeri: Bu örnekte 0 olarak verilmiş. Yani toplam fiyat hesaplamasına 0 ile başla
const items = [
  { id: 1, name: "T-shirt", price: 20, quantity: 2 },
  { id: 2, name: "Jeans", price: 50, quantity: 1 }
];
İlk öğe (T-shirt):
acc = 0 (Başlangıç değeri)
İlk ürün: { id: 1, name: "T-shirt", price: 20, quantity: 2 }
İşlem: acc + item.price * item.quantity
Yeni acc değeri: 0 + 20 * 2 = 40
İkinci öğe (Jeans):
acc = 40 (Bir önceki işlem sonucu)
İkinci ürün: { id: 2, name: "Jeans", price: 50, quantity: 1 }
İşlem: acc + item.price * item.quantity
Yeni acc değeri: 40 + 50 * 1 = 90
Sonuç olarak, totalPrice = 90 olur.
 */
    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return(

  <div id="cart">
    {items.length===0&&<p>No items in cart!</p>}
    {items.length>0&&(
        <ul id="card-items">
          {items.map((item)=>{
           const formattedPrice = `$${item.price.toFixed(2)}`;
           return(
            <li key={item.id}>
                <div>
                    <span>{item.name}</span>
                    <span>{formattedPrice}</span>
                </div>

                <div className="cart-item-actions">
                    <button onClick={()=>updateItemQuantity(item.id,-1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={()=>updateItemQuantity(item.id,1)}>+</button>
                </div>
            </li>
           )
          })}
        </ul>
    )}
    <p id="cart-total-price">
        Cart Total:<strong>{formattedTotalPrice}</strong>
    </p>
  </div>


    )
}