import { useState ,useEffect} from 'react';
import Places from './Places.jsx';
/** Bu bileşen, bir API'den (örneğin http://localhost:3000/places) yer bilgilerini alıp,
 *  Places adlı bir alt bileşene veri olarak geçiriyor.  */
export default  function AvailablePlaces({ onSelectPlace }) {

  const [avaliablePlaces,setAvaliablePlaces]=useState([])

  useEffect(()=>{
    //await anahtar keimesi yalnızca bu kelimenin yürütüldüğü fonks async ile dekore edildiyse kullanılabilir ama Component bileşenleri buna izin vermez burada kullanılamaz
    /**Frontend'de fetch('http://localhost:3000/places') yazmanızın nedeni, backend kodunun /places endpointini tanımlamış olmasıdır. Şimdi bunu adım adım açıklayalım:

1. Backend'deki Kodun İşlevi
javascript
Kodu kopyala
app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');
  const placesData = JSON.parse(fileContent);
  res.status(200).json({ places: placesData });
}); */
  fetch('http://localhost:3000/places').then((response)=>{/**
    fetch http isteği yapmamızı sağlar burada http://localhost:3000/places adresine get isteği yapar dönen bu değer promise olduğu için then blokları ile işlenir */
    return response.json()//sunucudan dönen cevabı json formatına çevirir
    //json text based data ama anahtar kelimelerde "" var backend ile veri alışverişinde json kullanılır
   })//sunucuya http isteği göndermek için kullanılan yöntemdir istek göndermek istediğiniz sunucunun url'sini ister
  .then((resData)=>{
   setAvaliablePlaces(resData.places)//neden resData.places dedik çünkü backendeki .json({ places: placesData }); kodundan dolayı
  })
  /**neden direkt setAvaliablePlaces(resData) demedik
   * Bu durum, API'den dönen verinin formatına bağlıdır.

Eğer API, fetch isteği sonucunda aşağıdaki gibi bir JSON yapısı döndürüyorsa:

json
Kodu kopyala
{
  "places": [
    { "id": 1, "name": "Place 1" },
    { "id": 2, "name": "Place 2" },
    { "id": 3, "name": "Place 3" }
  ]
}
Bu durumda, resData API yanıtının tamamını temsil eder, ancak bizim kullanmak istediğimiz veriler places anahtarının altında saklanmaktadır. Bu yüzden resData.places
  */
  },[])//bağımlılık dizisi boş olduğundan bu bileşen işlevi bileşen ilk render edildiğinde sadece 1 kez çalışır

  return (//http://localhost:3000 bu backend server'a erişir depolanan yerlere erişmek için /places
    <Places
      title="Available Places"
      places={avaliablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
