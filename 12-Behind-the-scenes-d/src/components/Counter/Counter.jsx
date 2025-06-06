import { useState,memo ,useCallback,useMemo,useEffect} from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';//sayacın değerini gösteren bileşen
import { log } from '../../log.js';

function isPrime(number) {//asal sayı kontrolü,prime=asal
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);
//Eğer sayı 2'den büyükse, sayının kareköküne kadar olan sayılarla bölen araması yapılır.
  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
/**
 * memo, bileşenin yalnızca belirli koşullar altında yeniden render edilmesini sağlayarak 
 * gereksiz render işlemlerini önler.Bu kullanım, Counter bileşeninin sadece prop'ları 
 * değiştiğinde yeniden render edilmesini sağlar
 */
const Counter = memo( function Counter({ initialCount }) {//sayaç initialcount ile başlatılır
  log('<Counter /> rendered', 1);
  const initialCountIsPrime = useMemo(()=>isPrime(initialCount),[initialCount]);

  // useEffect(()=>{
  //  setCounterChanges([{value:initialCount,id:Math.random()*1000}])
  // },[initialCount]) useEffect yerine Counter'a App.jsx'de key propu vericez
/**useMemo, React'te hesaplama sonucu elde edilen bir değeri önbelleğe alarak yalnızca belirli 
 * koşullar altında yeniden hesaplanmasını sağlayan bir hook'tur.Eğer bu dizi boş ([]) bırakılırsa,
 *  hesaplama sadece ilk render'da yapılır ve daha sonrasında tekrar edilmez. 
 * isPrime(initialCount) fonksiyonu pahalı bir işlem olabilir, çünkü asal sayı kontrolü
 *  yapılmaktadır. Eğer initialCount prop'u her değiştiğinde bu kontrol yapılacaksa, bu işlem
 *  tekrar tekrar çalışabilir ve gereksiz performans maliyeti doğurabilir.
 * seMemo, isPrime(initialCount) fonksiyonunu yalnızca initialCount değiştiğinde çalıştıracaktır. */
  const [counterChanges,setCounterChanges]=useState([{value:initialCount,id:Math.random()*1000}]);

  const currentCounter=counterChanges.reduce((prevCounter,counterChange)=>prevCounter+counterChange.value,0)
  const handleDecrement=useCallback(function handleDecrement() {
    //setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges)=>[{value:-1,id:Math.random()*1000},...prevCounterChanges])
  },[])

  const handleIncrement=useCallback(function handleIncrement() {
   // setCounter((prevCounter) => prevCounter + 1);
   setCounterChanges((prevCounterChanges)=>[{value:1,id:Math.random()*1000},...prevCounterChanges])
  },[])

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges}/>
    </section>
  );
})
export default Counter;
