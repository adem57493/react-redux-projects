import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem";
const requestConfig={};//bunu neden dışarda tanımladık,böyle yapınca sonsuz döngüden çıktı,böylece bir kez oluşturuluyor ve bellekten bu değeri alıyor
/**Kodunuzda requestConfig'i bileşen dışında tanımlamanızın nedeni, React bileşeninin her render edildiğinde aynı referansa sahip bir nesneye ihtiyaç duymasıdır. Eğer requestConfig bileşen içinde tanımlanmış olsaydı, her render sırasında yeni bir nesne oluşturulur
 * Bu durumda:

Her render sırasında requestConfig yeni bir nesne olarak oluşturulur. (Nesnelerin referansı her zaman farklıdır.)
React bunu bir değişiklik olarak algılar ve useHttp hook'u yeniden çalışır.
Bu, sonsuz döngüye neden olabilir çünkü config bağımlılık listesinde yer alıyor,
dışarda tanımlarsak:
React her render sırasında aynı nesne referansını kullanır.
useHttp'un bağımlılıkları değişmediği için, gereksiz yere yeniden çalıştırılmaz.
 */
export default function Meals(){//component fonks'da asyns anahtar kelimesi kullanılamıyor

  
 const {data:loadedMeals,isLoading,error} =useHttp('http://localhost:3000/meals',requestConfig,[]);
   /**
    * sendRequest alınmamış.

Sebep: sendRequest'e Gerek Kalmaması
useHttp içinde, GET istekleri için useEffect zaten sendRequest'i otomatik olarak çağırıyor:
javascript
Kodu kopyala
useEffect(() => {
    if (config && (config.method == 'GET' || !config.method) || !config) {
        sendRequest();
    }
}, [sendRequest, config]);
Bu yüzden, bileşende sendRequest'i manuel olarak çağırmanıza gerek yok. İstek otomatik olarak yapılıyor.

    */
 console.log(loadedMeals);

 if(isLoading){
    return <p className="center">Fetching meals...</p>
 }

 if(error){
    return <Error title="Failed to fetch meals" message={error}/>
 }

    return <ul id="meals">
    {loadedMeals.map((meal)=>(
        <MealItem key={meal.id} meal={meal}/>
    ))}
    </ul>

}