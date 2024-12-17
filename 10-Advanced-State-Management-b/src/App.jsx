
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Product from "./components/Product.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";
import CartContextProvider from './store/shopping-cart-context.jsx'
function App() {
 
  return (//Header sepet bilgilerini gösteren bileşen
  <CartContextProvider>
  <Header  />
   
  <Shop>
  {DUMMY_PRODUCTS.map((product)=>(
                    <li key={product.id}>
                        <Product {...product}  />
                    </li>
                ))}
    </Shop>
  </CartContextProvider>
  )
}

export default App;//Shop ürünlerin listelendiği ve sepete ürün ekleme işleminin gerçekleştiği bileşen
//handleAddItemToCard sepete yeni bir ürün ekler veya mevcut ürünün miktarını artırır
//handleUpdateCartItemQuantity fonksiyonu, sepetteki bir ürünün miktarını artırır, azaltır ya da sıfırın altına düştüğünde sepetten çıkarır.
/**
 * Shop bileşeni ürünlerin listelendiği yer olduğu için, yeni bir ürün eklemek bu bileşenin sorumluluğundadır. Ancak Header bileşeni sepetin
 *  görüntülendiği ve yönetildiği yerdir, dolayısıyla ürün miktarını güncellemek bu bileşene aittir.
 * Kullanıcı genellikle ürünleri sepeti inceleyerek çıkarmak veya miktarını değiştirmek ister. Bu nedenle, bu fonksiyonu sepette ürünleri gösteren bileşene (Header) vermek daha mantıklıdır.
 */