import classes from './Counter.module.css';
import { useSelector ,useDispatch} from 'react-redux';//useSelector redux mağazasındaki durumu doğrudan okumak için kullanılır,Redux mağasındaki durumu doğrudan okumak için kullanılır
const Counter = () => {
 const counter= useSelector(state=>state.counter);
 const show=useSelector(state=>state.showCounter)
 const dispatch=useDispatch();

 const incrementHandler=()=>{
  dispatch({type:'increment'})
 }
 const decrementHandler=()=>{
 dispatch({type:'decrement'})
 }

 const increaseHandler=()=>{
  dispatch({type:'increase',amount:5})
 }
  const toggleCounterHandler = () => {
    dispatch({type:'toggle'})
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
