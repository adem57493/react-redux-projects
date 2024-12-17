export async function fetchAvailiablePlaces(){

    const response=await fetch('http://localhost:3000/places')
    const resData=await response.json()

    if(!response.ok){
      throw new Error('Failed to fetch places');
    }
    
    return resData.places;

}

export async function updateUserPlaces(places){/**bu fonks http put isteği yaparak kullanıcıya
   ait yerler verisini sunucuya günceller,fonks kullanıcıdan aldığı places verisini sunucuya gönderir
   */
//places parametresi güncellenmek istenen yerler listesidir
//fetch ile backenddeki /user-places endpointine put isteği yapılır
 const response=await fetch('http://localhost:3000/user-places',{//await kullanarak işlemin tamamlanmasını bekleriz HTTP istekleri gibi zaman alan işlemler için kullanışlıdır
    method:'PUT',
    body:JSON.stringify({places:places}),// body:JSON.stringify({places:places}) sunucuya gönderilecek veri
    /**places nesnesi, JSON formatına dönüştürülür çünkü HTTP üzerinden gönderilen veriler
     *  genellikle JSON formatında olur. */
    headers:{/**nucuya gönderilen verinin türünü (JSON) belirtir. Bu bilgi olmadan sunucu,
       istemciden gelen veriyi nasıl işleyeceğini bilemeyebilir. */
      'Content-Type':'application/json'
    }
  })

  const resData=await response.json();/** response.json() backendden gelen yanıtı söyler
  sunucudan dönen veriyi JSON formatında çözümlemek için kullanılır. 
  Örnek olarak, sunucudan şu şekilde bir yanıt dönebilir:
{ "message": "User places updated successfully." } */

  if(!response.ok){

    throw new Error('Failed to update user data.')
  }
  return resData.message;
}

/**
 * 
 */
/**backend tarafındaki put endpointi istemciden frontendden gelen places yerler dizisini alır ve
 * ve bunu sunucuda bir user-places.json dosyasına yazar
 */// /user-places bu bir endpoint,frontenddeki updateUserPlaces fonksiyonu backenddeki /user-places endpointi ile iletişim kurar
/**app.put('/user-places', async (req, res) => {
  const places = req.body.places;/**req.body.places: Gelen isteğin frontendden gelen gövdesindeki places verisini 
  alır. Bu veri http PUT isteğinin gövdesinde bulunur

  await fs.writeFile('./data/user-places.json', JSON.stringify(places));/**
  fs.writeFile('./data/user-places.json', JSON.stringify(places)): Bu veriyi user-places.json
   dosyasına yazar. */

 //res.status(200).json({ message: 'User places updated!' });
// res.status(200).json({ message: 'User places updated!' }): Başarılı bir güncelleme mesajı döner. */
//}); 