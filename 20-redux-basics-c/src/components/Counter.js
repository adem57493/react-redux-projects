import classes from './Counter.module.css';
import { useSelector ,useDispatch} from 'react-redux';
import { counterActions } from '../store';
//useSelector redux mağazasındaki durumu doğrudan okumak için kullanılır,Redux mağasındaki durumu doğrudan okumak için kullanılır
//REDUX-TOOLKİT'i indirmek için terminak kodu=npm install @reduxjs/toolkit
const Counter = () => {
 const counter= useSelector(state=>state.counter);
 const show=useSelector(state=>state.showCounter)
 const dispatch=useDispatch();

 const incrementHandler=()=>{
  dispatch(counterActions.increment())
 }
 const decrementHandler=()=>{
 dispatch(counterActions.decrement())
 }

 const increaseHandler=()=>{
  dispatch(counterActions.increase())//{type:'SOME_UNIQUE_IDENTIFIER,payload:10}
 }
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
     {show && (<div className={classes.value}>{counter}</div>)}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
