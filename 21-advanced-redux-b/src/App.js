import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from 'react-redux';


function App() {
  const showCart=useSelector(state=>state.ui.cartIsVisible)
  return (//LAYOUT=DÜZEN
    <Layout>
     {showCart && <Cart />}
      <Products />
    </Layout>
  );
}


export default App;
//komut satırına yaz:
//NPM İNSTALL
//NPM START
//NPM İNSTALL REDUX REACT-REDUX
//npm install @reduxjs/toolkit

