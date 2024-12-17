import Header from "./components/Header";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Meals from "./components/Meals"
import Checkout from "./components/Checkout";
function App() {
  return (
    <>
    <UserProgressContextProvider>
    <CartContextProvider>
    <Header/>
    <Meals/>
    <Checkout/>
    </CartContextProvider>
    </UserProgressContextProvider>
    </>
  );
}

export default App;
