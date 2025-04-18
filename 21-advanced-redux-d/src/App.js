import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from 'react-redux';
import { useEffect,Fragment } from 'react';
import {uiActions} from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial=true;

function App() {
  const dispatch=useDispatch();
  const showCart=useSelector(state=>state.ui.cartIsVisible)
  const cart=useSelector(state=>state.cart);
  const notification=useSelector(state=>state.ui.notification)
  useEffect(()=>{
    const sendCartData=async()=>{
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'Sending..',
        message:'sending cart data'
      }))
     const response=await fetch(' https://ffff-dc4b1-default-rtdb.firebaseio.com/cart.json',{
        method:'PUT',
       body:JSON.stringify(cart),
     });

     if(!response.ok){
     throw new Error('Sending cart data failed.')
     }
  

     dispatch(uiActions.showNotification({
      status:'succes',
      title:'Success!',
      message:'Sent cart data successfully!'
    }))
    }
  
   // //firebase database'ini kullandım,url'nin sonuna  /cart.json ifadesini ekledik
   if(isInitial){
    isInitial=false;
    return;
   }

   sendCartData().catch(error=>{
    dispatch(
      uiActions.showNotification({
        status:'error',
        title:'Error',
        message:'Sending cart data failed'
      })
    )
   })
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

