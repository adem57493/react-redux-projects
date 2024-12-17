import { useRef,useState ,useEffect} from "react";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from './assets/logo.png';
import Places from "./components/Places.jsx";
import {AVAILABLE_PLACES} from './data.js';
import {sortPlacesByDistance} from './loc.js'

function App() {
  const modal=useRef()
  const selecedPlace=useRef()//silme işleminde hangi yerin seçildiği bu referansla bildirilir

const [pickedPlaces,setPickedPlaces]=useState([])
const [avaliablePlaces,setAvaliablePlaces]=useState([])

useEffect(()=>{
  const storedIds= JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  const storedPlaces=storedIds.map(id=>AVAILABLE_PLACES.find((place)=>place.id===id))
  setPickedPlaces(storedPlaces)
},[])
useEffect(()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
    const sortedPlaces= sortPlacesByDistance(AVAILABLE_PLACES,position.coords.latitude,position.coords.longitude)
    setAvaliablePlaces(sortedPlaces)
   })
},[])


function handleStartRemovePlace(id){//silme işlemini başlatır, silinecek yerin id'sini alır, modalı açar ve selectedPlace.current2a silinecek yerin id'sini atar
  modal.current.open()//current özelliği, useRef tarafından tutulan değeri ifade ede
  selecedPlace.current=id;//silinmek üzere seçilen yerin id değerini selecedPlace referansında tutar.
}

function handleStopRemovePlace(){
  modal.current.close();
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

 const storedIds= JSON.parse(localStorage.getItem('selectedPlaces')) || [];
 if(storedIds.indexOf(id)===-1){
  localStorage.setItem('selectedPlaces',JSON.stringify([id,...storedIds]))
 }

}
/**
 * Seçilen yeri "Gitmek İstediği Yerler" listesinden çıkarır. Bu, selecedPlace.current'e kaydedilen id'ye göre yapılır.
İşlem tamamlandıktan sonra modal kapatılır
 */

function handleRemovePlace(){
setPickedPlaces((prevPickedPlaces)=>
prevPickedPlaces.filter((place)=>place.id!==selecedPlace.current))
modal.current.close();

const storedIds= JSON.parse(localStorage.getItem('selectedPlaces')) || [];
localStorage.setItem('selectedPlaces',JSON.stringify(storedIds.filter((id)=>id!==selecedPlace.current)))
}
  return (
  <>
  <Modal ref={modal}> 
    <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace}/>
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
