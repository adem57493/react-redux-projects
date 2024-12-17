

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedPlaces(){

const places=await fetchAvailablePlaces();

return new Promise((resolve)=>{/*promise javascriptte asenkron işlemleri yönetmek için kullanılan
   nesnedir ,resolve işlem başarılı olduğunda çağrılan fonks reject işlem başarısız olduğunda 
   çağrılan fonksiyondur*/

  navigator.geolocation.getCurrentPosition((position) => {//position kullanıcının mevcut konumu
    const sortedPlaces = sortPlacesByDistance(
      places,
      position.coords.latitude,
      position.coords.longitude
    );

    resolve(sortedPlaces);/** resolve bu Promise'in tamamlandığını ve sonuş olarak sıralanmış yerler listesinin
    döndürüldüğünü söyler */
    /**fetchSortedPlaces sıralanmış yerler listesini döndürmek için promise oluşturuyor */
  
  });
})

}



export default function AvailablePlaces({ onSelectPlace }) {
  
 const { isFetching,error,fetchedData:avaliablePlaces} =useFetch(fetchSortedPlaces,[]);

  

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
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
