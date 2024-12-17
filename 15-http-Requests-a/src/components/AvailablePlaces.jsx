import { useState ,useEffect} from 'react';
import Places from './Places.jsx';

export default  function AvailablePlaces({ onSelectPlace }) {
 const [isFetching,setIsFetching]=useState(false);//verilerin yüklenip yüklenmediğini kontrol eder,veriler yüklenirken true olur,yükleme tamamlandığında false olur
  const [avaliablePlaces,setAvaliablePlaces]=useState([])
const [error,setError]=useState()
  useEffect(()=>{
   
    async function fetchPlaces(){//backend'den yer listesini çeker
      setIsFetching(true);//yüklenme durumunu true yapar bu kullanıcıya veriler yükleniyor gibi bir mesaj göstermek için kullanılır
      //f12'deyi basınca gelen yerden network'e git slow3G'yi seç sayfa yavaş yüklenirken verileri çekerken fetching place data yazıyor

      try{
        const response=await fetch('http://localhost:3000/places')
        const resData=await response.json()//gelen cevap json nesnesine döndürülür
  
        if(!response.ok){
          throw new Error('Failed to fetch places');
        }

        

        setAvaliablePlaces(resData.places)
      } catch(error){
        setError({message:error.message || 'Could not fetch places, please try again later.'})
      }
      
     
     
      setIsFetching(false);//yükleme tamamlandıktan sonra setIsFetching(false) yapılarak yükleme durumu sonlandırılır
    }

    fetchPlaces()
    //await anahtar keimesi yalnızca bu kelimenin yürütüldüğü fonks async ile dekore edildiyse kullanılabilir ama Component bileşenleri buna izin vermez burada kullanılamaz
  
   //json text based data ama anahtar kelimelerde "" var backend ile veri alışverişinde json kullanılır
 //sunucuya http isteği göndermek için kullanılan yöntemdir istek göndermek istediğiniz sunucunun url'sini ister
  
 
  },[])//bağımlılık dizisi boş olduğundan bu bileşen işlevi bileşen ilk render edildiğinde sadece 1 kez çalışır
 if(error){
  return <Error title='An error occured!' message={error.message}/> // Nesneden hata mesajını alıyoruz
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
