import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from 'react-redux';
import { useEffect,Fragment } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData,fetchCartData } from './store/cart-actions';


let isInitial=true;

function App() {
  const dispatch=useDispatch();
  const showCart=useSelector(state=>state.ui.cartIsVisible)
  const cart=useSelector(state=>state.cart);
  const notification=useSelector(state=>state.ui.notification)

  useEffect(()=>{
  dispatch(fetchCartData())
  },[dispatch])

  useEffect(()=>{
   
    if(isInitial){
      isInitial=false;
      return;
    }
  if(cart.changed){
    dispatch(sendCartData(cart));
  }
   
   // //firebase database'ini kullandım,url'nin sonuna  /cart.json ifadesini ekledik

  
  },[cart,dispatch])
  return (//LAYOUT=DÜZEN
    <Fragment>
   {  notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
     {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}


export default App;
//komut satırına yaz:
//NPM İNSTALL
//NPM START
//NPM İNSTALL REDUX REACT-REDUX
//npm install @reduxjs/toolkit

