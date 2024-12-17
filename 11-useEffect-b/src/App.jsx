import { useRef,useState ,useEffect,useCallback} from "react";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from './assets/logo.png';
import Places from "./components/Places.jsx";
import {AVAILABLE_PLACES} from './data.js';
import {sortPlacesByDistance} from './loc.js'
/**useEffect, React bileşenleri içinde yan etkileri yönetmek için kullanılan bir hook'tur. 
 * Örneğin:

Veri almak (API çağrıları, konum bilgisi gibi).
Tarayıcıya veya belleğe veri kaydetmek (localStorage kullanmak).
Zamanlayıcılar kurmak.

Eğer bağımlılık dizisini boş [] olarak bırakırsak, useEffect yalnızca bileşen ilk yüklendiğinde bir kez çalışır. Bu, verinin sadece
 bir kere alınmasını ve bileşen her yeniden render olduğunda aynı işlemin tekrarlanmasını engeller.
 bu durumda, kullanıcının konumunu yalnızca bir kez almamız ve her render'da bu işlemin tekrarlanmaması
  için uygun bir çözümdür.
 */
/*storedIds, localStorage'da daha önce seçilen yerlerin kimliklerini (id) alır; localStorage boşsa, boş bir dizi döner
*/
/**
 * localStorage, tarayıcıda kalıcı olarak veri depolamak için kullanılan bir yapıdır. Bir kez eklendiğinde, tarayıcı kapatılsa 
 * bile veriler korunur ve sonraki oturumlarda tekrar erişilebilir.
 */
const storedIds= JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces=storedIds.map(id=>AVAILABLE_PLACES.find((place)=>place.id===id))

function App() {
 
  //selectedPlace: Silme işleminde kullanılmak üzere silinecek yerin id değerini saklar.
  /**
   * pickedPlaces: Kullanıcının seçtiği yerlerin listesi olarak başlatılır.
avaliablePlaces: Kullanıcının mevcut konumuna göre sıralanan yerlerin listesini tutar.
   */
  const selecedPlace=useRef()//silme işleminde hangi yerin seçildiği bu referansla bildirilir
const [modalIsOpen,setModalIsOpen]=useState(false)
const [pickedPlaces,setPickedPlaces]=useState(storedPlaces)
const [avaliablePlaces,setAvaliablePlaces]=useState([])


 //useEffect ile kullanıcının mevcut konumunu alma
useEffect(()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
    const sortedPlaces= sortPlacesByDistance(AVAILABLE_PLACES,position.coords.latitude,position.coords.longitude)
    setAvaliablePlaces(sortedPlaces)
   })
},[])//bağımlılık dizisi boş olduğu için bileşen sayfa yüklendiğinde yalnızca bir kez çalışacak
/**
 sortPlacesByDistance fonksiyonu, kullanıcı konumuna göre AVAILABLE_PLACES dizisini sıralar ve avaliablePlaces
  durumuna ayarlar.
 */


function handleStartRemovePlace(id){//silme işlemini başlatır, silinecek yerin id'sini alır, modalı açar ve selectedPlace.current2a silinecek yerin id'sini atar
  setModalIsOpen(true)//current özelliği, useRef tarafından tutulan değeri ifade ede
  selecedPlace.current=id;//silinmek üzere seçilen yerin id değerini selecedPlace referansında tutar.
}

function handleStopRemovePlace(){
  setModalIsOpen(false)
}

function handleSelectPlace(id) {//kullanıcı bir yeri seçtiğinde çalışır
  /**
   * Eğer seçilen yer daha önce "Gitmek İstediği Yerler" listesinde varsa, listeye tekrar eklenmez.
Seçilen yer AVAILABLE_PLACES dizisinde bulunur ve mevcut listenin başına eklenir.
   */
  /**
   * some() metodu:Eğer dizi içinde belirtilen koşulu sağlayan en az bir öğe varsa, true döner; aksi takdirde false döner.
   */
  /**
   * revPickedPlaces dizisi içinde seçilen id ile eşleşen bir yer olup olmadığını kontrol eder. Eğer bu yer zaten listede varsa, mevcut listeyi (değiştirmeden) geri döner, böylece aynı yerin birden fazla kez eklenmesi engellenir.
   */
  setPickedPlaces((prevPickedPlaces) => {
    if (prevPickedPlaces.some((place) => place.id === id)) {
      return prevPickedPlaces;
    }
    const place = AVAILABLE_PLACES.find((place) => place.id === id);
    return [place, ...prevPickedPlaces];
  });
/**
 * localStorage'dan "selectedPlaces" anahtarına kayıtlı veriyi alıp bir JavaScript dizisi
 *  olarak kullanabilmek için JSON.parse() ile çözümlemekte.
 */
 const storedIds= JSON.parse(localStorage.getItem('selectedPlaces')) || [];//localStorage veriyi yalnızca düz bir metin (string) formatında saklayabilir,
 /**
  * Eğer id, storedIds dizisinde yoksa, localStorage'da selectedPlaces anahtarı
  *  altında yeni bir değer saklamak için setItem kullanılır.
  */
 if(storedIds.indexOf(id)===-1){//indexOf belirtilen id'nin localStorage'da nerede bulunduğunu belirler eğer id yoksa indexOf -1 döner
  localStorage.setItem('selectedPlaces',JSON.stringify([id,...storedIds]))
 }//localStorage'a da seçilen yerin id değerini ekler, böylece sayfa yenilendiğinde veriler kaybolmaz.


}
/**
 * Seçilen yeri "Gitmek İstediği Yerler" listesinden çıkarır. Bu, selecedPlace.current'e kaydedilen id'ye göre yapılır.
İşlem tamamlandıktan sonra modal kapatılır
 */
const handleRemovePlace= useCallback(//selecedPlace.current'deki id değerini filtreleyerek pickedPlaces ve localStorage'dan siler ve modalı kapatır.
  function handleRemovePlace(){
    setPickedPlaces((prevPickedPlaces)=>
    prevPickedPlaces.filter((place)=>place.id!==selecedPlace.current))
   setModalIsOpen(false)
    
    const storedIds= JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces',JSON.stringify(storedIds.filter((id)=>id!==selecedPlace.current)))
    },[])//kullanıcının yaptığı işlemlerde useEffect yerine useCallback kullanılır örneğin butona tıklandığında öğenin kaldırılması

  return (
  <>
  <Modal  open={modalIsOpen} onClose={handleStopRemovePlace}> 
    {modalIsOpen&&(<DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace}/>)}
    </Modal>

    <header>
      <img src={logoImg} alt="Stylized globe" />
      <h1>Place picker</h1>
      <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
    </header>

    <main>
      <Places title="I'd like to visit..." fallbackText={'Select the places you would like to visit below.'} places={pickedPlaces} onSelectPlace={handleStartRemovePlace}/>
      <Places title="Avaliable Places" fallbackText="Sorting places by distance" places={AVAILABLE_PLACES} onSelectPlace={handleSelectPlace}/>
    </main>
    </>
  )
}

export default App;
