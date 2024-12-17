import { useState ,useEffect} from 'react';
import Places from './Places.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailiablePlaces } from '../http.js';

export default  function AvailablePlaces({ onSelectPlace }) {
 const [isFetching,setIsFetching]=useState(false)
  const [avaliablePlaces,setAvaliablePlaces]=useState([])
const [error,setError]=useState()
  useEffect(()=>{
   
    async function fetchPlaces(){
      setIsFetching(true)//f12'deyi basınca gelen yerden network'e git slow3G'yi seç sayfa yavaş yüklenirken verileri çekerken fetching place data yazıyor

      try{

      const places= await fetchAvailiablePlaces()//await ekliyoruz çünkü asyncronazied ile süslenmiş her fonksiyon bir promise döndürür
       //navigator.geolocation.getCurrentPosition kullanıcının konumunu alır position.coords.latitude kullanıcının enlem ve boylam bilgileri alınır
        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces=sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude)
          setAvaliablePlaces(sortedPlaces)
          setIsFetching(false)
        })//getCurrentPosition'dan sonra asyns await değil callback fonks kullandığımızdan setIsFetching'in yerini değiştirmemiz gerekiyor çünkü burada bunu yapmak çok erken olarak yanlış ayarlayacaktır konuma göre sıralamayı bitirene kadar beklemek istiyorum

       
      } catch(error){
        setError({message:error.message || 'Could not fetch places, please try again later.'})
        setIsFetching(false)
      }
      
     
     
     
    }

    fetchPlaces()
    //await anahtar keimesi yalnızca bu kelimenin yürütüldüğü fonks async ile dekore edildiyse kullanılabilir ama Component bileşenleri buna izin vermez burada kullanılamaz
  
   //json text based data ama anahtar kelimelerde "" var backend ile veri alışverişinde json kullanılır
 //sunucuya http isteği göndermek için kullanılan yöntemdir istek göndermek istediğiniz sunucunun url'sini ister
  
 
  },[])//bağımlılık dizisi boş olduğundan bu bileşen işlevi bileşen ilk render edildiğinde sadece 1 kez çalışır
 if(error){
  return <Error title='An error occured!' message={error.message}/>
 }
  return (//http://localhost:3000 bu backend server'a erişir depolanan yerlere erişmek için /places
    <Places
      title="Available Places"
      places={avaliablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
