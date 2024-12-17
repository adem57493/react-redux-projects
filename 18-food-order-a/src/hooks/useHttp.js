import { useState,useEffect, useCallback} from "react";



async function sendHttpRequest(url,config) {//config http isteği için yapılandırma bilgileri(örn method ,headers,body)
  const response=await  fetch(url,config);

  const resData=await response.json();
  if(!response.ok){
    throw new Error(resData.message || 'Something went wrong, failed to send request.');
  }
  return resData;
}
//initialData başlangıçta veri durumu için kullanılacaka değer
export default function useHttp(url,config,initialData){//Meals.jsx'de http isteği useEffect ile sayfa ilk render edildiğinde ,Checkout.jsx'de ise form onSubmit olduğunda bunun için yardımçı bir fonksiyon eklecez sendHttpRequest
   const [data,setData]=useState(initialData);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState();

    function clearData(){
      setData(initialData);
    }
const sendRequest= useCallback(  async function sendRequest(data){
    setIsLoading(true);/**use callback kullanılmasının sebebi:
    useEffect içinde bir fonksiyon tanımlamak her render'da yeni bir referans oluşturur.
    seCallback, sendRequest fonksiyonunun yalnızca bağımlılıklar (url, config) değiştiğinde
     yeniden oluşturulmasını sağlar. */
    try{//internet bağlantısından doğan hatalar için try catch
   const resData=await sendHttpRequest(url,{...config,body:data});
   setData(resData);
}
   catch(error){
      setError(error.message || 'Something went wrong!');
   }

   setIsLoading(false);
},[url,config])

useEffect(()=>{//Eğer config yoksa ya da istek yöntemi GET ise, veri alınır.
    if(config && (config.method=='GET' || !config.method) || !config){
      /**Eğer config tanımlı (undefined değil) ise, diğer ifadeleri değerlendir.
       * Eğer config undefined ya da null ise, false döner ve sendRequest çağrılmaz.
       * || !config Kontrolü:

Eğer config tanımlı değilse (undefined veya null), bu ifade true olur.
Bu durumda sendRequest çağrılır.

Tam Mantık:
Eğer:
config tanımlı ve:
İstek yöntemi GET ise,
ya da istek yöntemi belirtilmemişse (!config.method),
ya da config hiç tanımlı değilse,
sendRequest çağrılır.

Bu koşulun amacı:

Sadece GET istekleri ya da istek yöntemi belirtilmemişse HTTP isteğini otomatik tetiklemek.
GET istekleri genelde veri çekmek için kullanılır ve otomatik tetiklenmesi uygun olur.
Eğer config tanımlı değilse (undefined), varsayılan olarak istek yapılmasını sağlamak.
Senaryo 1: config Tanımlı ve method GET
javascript
Kodu kopyala
const config = { method: 'GET' };
// Koşul: config && (config.method == 'GET' || !config.method) || !config
// Sonuç: true
Neden: config tanımlı ve config.method GET olduğu için sendRequest çağrılır.
Senaryo 2: config Tanımlı ama method POST
javascript
Kodu kopyala
const config = { method: 'POST' };
// Koşul: config && (config.method == 'GET' || !config.method) || !config
// Sonuç: false
Neden: config.method GET değil ve config.method boş değil. Bu yüzden sendRequest çağrılmaz.
Senaryo 3: config Tanımlı Değil
javascript
Kodu kopyala
const config = undefined;
// Koşul: config && (config.method == 'GET' || !config.method) || !config
// Sonuç: true


useCallback bağımsız bir tetikleyici sağlamaz" ifadesiyle şunu kastediyorum:

useCallback, yalnızca bir fonksiyonun referansını "hatırlayan" bir araçtır.
Bir fonksiyonu bellekte saklar ve yeniden oluşturulmamasını sağlar.
Amaç: Performans optimizasyonu.
Ancak useCallback, bu fonksiyonu kendiliğinden çalıştırmaz. Sadece o fonksiyonu bir yerde çağırmanız gerektiğinde, aynı referans üzerinden erişebilmenizi sağlar.
bağımsız tetikleyici bir işlemi otomatik olarak başlatan demek

odunuzu incelediğimizde, sendRequest fonksiyonunun manuel tetiklenmesi için bir durum oluşturduğunuz yer burasıdır:

javascript
Kodu kopyala
return {
    data,
    isLoading,
    error,
    sendRequest // böylece bu custom hooku kullanan bileşenler sendRequest'e doğrudan erişebilir
}
       */
 sendRequest();}/**Eğer useCallback kullanılsaydı, sendRequest fonksiyonu otomatik olarak
  çağrılmazdı. Bunun yerine, manuel olarak tetiklenmesi gerekirdi. */
},[sendRequest,config])
/**Otomatik Tetikleme: useEffect ile ilk render sırasında ya da bağımlılıklar (config, sendRequest) değiştiğinde sendRequest çağrılıyor.
Manuel Tetikleme: sendRequest, bir butona tıklama ya da form gönderme gibi durumlarda manuel olarak çağrılabiliyor. */
return{
    data,
    isLoading,
    error,
    sendRequest,//böylece bu custom hooku kullanan bileşenler sendRequest'e doğrudan erişebilir
    clearData
}




}