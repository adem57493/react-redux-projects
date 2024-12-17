import { useState,useEffect } from "react";
import MealItem from "./MealItem";
export default function Meals(){//component fonks'da asyns anahtar kelimesi kullanılamıyor

    const [loadedMeals,setLoadedMeals]=useState([]);

    useEffect(()=>{
        async function fetchMeals(){
            const response = await fetch('http://localhost:3000/meals');
       
            if(!response.ok){//bu örneğin endpoint yanlış olursa,internet bağlantısından oluşabilecek hata için try catch kullanılır
       
            }
       
            const meals=await response.json();//json() yöntemi Promise döndürdüğünden await kullandık
            setLoadedMeals(meals);
           }
       
           fetchMeals();/*fonskiyonu burda çağırırsak setLoadedMeals'i çağırırız state güncellenirse
            state'in ait olduğu component tekrar çağrılır bu çağrılınca fetchMeals() dedik yani bu 
            tekrar çağrılır state tekrardan ayarlanır uygulama çöker bu nedenle useEffect gerekli
       */
    },[])//bağımlılık olmadığından bu fonks başlangıçta çağrılır bir daha da çağrılmaz
   
    return <ul id="meals">
    {loadedMeals.map((meal)=>(
        <MealItem key={meal.id} meal={meal}/>
    ))}
    </ul>

}