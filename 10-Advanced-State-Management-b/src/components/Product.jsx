import { CartContext } from "../store/shopping-cart-context"
import { useContext } from "react"
export default function Product({id,image,title,price,description}){

    const {addItemtoCart}=useContext(CartContext)
//addItemtoCart: Bu satır, CartContext'ten sepete ürün ekleme işlevini (addItemtoCart) çıkarır. addItemtoCart, bir ürünü sepete eklemek için kullanılan işlevdir.
//useContext ile CartContext'ten addItemtoCart işlevi alınır ve bu işlev, ürünleri sepete eklemek için kullanılır.
/**
 * addItemtoCart: () => {} başta boş tanımlanmıştır çünkü bu bir varsayılan değerdir.
Ancak, CartContext.Provider kullanıldığında, bu boş fonksiyon gerçek bir fonksiyonla değiştirilir
 */
    return(
     <article className="product">
        <img src={image} alt={title} />
        <div className="product-content">
            <div>
                <h3>{title}</h3>
                <p className="product-price">${price}</p>
                <p>{description}</p>
            </div>
            <p className="product-actions">
                <button onClick={()=>addItemtoCart(id)}>Add to cart</button>
            </p>
        </div>
     </article>

    )
}