import fs from 'node:fs/promises';/**fs/promises: Node.js'in dosya sistemi işlemleri için 
kullanılan modülüdür. Bu modül, dosya okuma ve yazma gibi işlemleri asenkron bir şekilde 
gerçekleştirir. */

import bodyParser from 'body-parser';/**
body-parser: Gelen HTTP istek gövdesini (request body) ayrıştırmak için kullanılır. JSON 
verilerle çalışmak için önemlidir. */
import express from 'express';/**express bir node.js çerçevesi */

const app = express();/**app, Express uygulamasını temsil eder. Bu obje,
 rota tanımlama, middleware ekleme ve HTTP işlemlerini yönetmek için kullanılır. */

app.use(express.static('images'));/**Bu kod, images klasöründeki dosyaların statik olarak
 sunulmasını sağlar. Bu, uygulamanın bu klasör içindeki dosyalara (örneğin resim dosyalarına) 
 doğrudan erişim sağladığı anlamına gelir. Örneğin, images/sample.jpg dosyasına /sample.jpg 
 URL'si üzerinden ulaşılabilir. */
app.use(bodyParser.json());/**bodyParser.json(): Gelen HTTP isteğinin JSON formatındaki gövdesini
 ayrıştırır. Bu sayede, istemciden gelen JSON verilerine req.body üzerinden erişilebilir. */

// CORS
/**CORS (Cross-Origin Resource Sharing): Farklı kaynaklardan gelen isteklerin kabul edilmesini
 *  sağlar. */

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains domainden gelen isteklere izin verir
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');//get,put isteklerine izin verir
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');//istemcinin Content-Type başlığını kullanarak veri göndermesine izin verir

  next();//next() bir sonraki middlewhare fonks çalıştırılmasını sağlar
});

/**Sunucudaki places.json dosyasını okuyarak istemciye bu verileri döner. */
app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');/**fs.readFile
  ('./data/places.json'): places.json dosyasını okur. */

  const placesData = JSON.parse(fileContent);/**JSON.parse(fileContent): Okunan dosya içeriğini
  bir JavaScript nesnesine dönüştürür. */

  res.status(200).json({ places: placesData });/**res.status(200).json({ places: placesData }):
   HTTP yanıtında JSON formatında veri döndürür. */
});

/**Bu rota da benzer şekilde user-places.json dosyasını okuyarak istemciye bu verileri döner. */
app.get('/user-places', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-places.json');

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

/** İstemciden gelen verileri alarak user-places.json dosyasını günceller. */
app.put('/user-places', async (req, res) => {
  const places = req.body.places;/**req.body.places: Gelen isteğin gövdesindeki places verisini 
  alır. */

  await fs.writeFile('./data/user-places.json', JSON.stringify(places));/**
   fs.writeFile('./data/user-places.json', JSON.stringify(places)): Bu veriyi user-places.json
    dosyasına yazar. */

  res.status(200).json({ message: 'User places updated!' });/**
  res.status(200).json({ message: 'User places updated!' }): Başarılı bir güncelleme mesajı döner. */
});

// 404
/**Bu middleware, yukarıdaki rotalarla eşleşmeyen tüm istekleri yakalar. */
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {/**OPTIONS İsteği: Tarayıcıların ön kontrol isteğidir. Bu 
    istekler görmezden gelinir (next() ile devam edilir). */
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);/**Sunucu, 3000 numaralı port üzerinden çalıştırılır.
Uygulamaya http://localhost:3000 adresi üzerinden erişilebilir. */
//GET istekleriyle places ve user-places verilerini döner.
//PUT isteğiyle user-places verilerini günceller.


/**RESTful API, Representational State Transfer (REST) mimarisine uygun olarak tasarlanmış bir
 *  web servisi ya da uygulama programlama arayüzüdür. RESTful API'ler, istemci (client) ve 
 * sunucu (server) arasındaki iletişimi sağlamak için HTTP protokolünü kullanır. 
 * 
 * RESTful API'ler, veri veya işlemleri kaynak (resource) olarak temsil eder. Örneğin:
Kullanıcılar için bir kaynak: /users
Ürünler için bir kaynak: /products
Her kaynak bir URI (Uniform Resource Identifier) ile tanımlanır.
Örnek: https://api.example.com/users/123 (ID'si 123 olan kullanıcı)

/products (GET): Tüm ürünleri getir.
/products (POST): Yeni bir ürün ekle.
/products/45 (PUT): ID'si 45 olan ürünü güncelle.
/products/45 (DELETE): ID'si 45 olan ürünü sil.

RESTful API, veri alışverişi için genellikle JSON veya XML formatını kullanır.*/

/**API endpoints (API uç noktaları), bir API (Application Programming Interface)
 *  içinde belirli bir işlevselliğe erişim sağlayan URL'lerdir.
 * 
 * 
 * Base URL (Temel URL): API'nin ana adresi.
Route (Yol): API'deki belirli bir kaynağa veya işleme erişim sağlayan uzantı.
HTTP Metodu: Kaynak üzerinde yapılacak işlemi tanımlar (GET, POST, PUT, DELETE vb.).
Örneğin:

http
Kodu kopyala
https://api.example.com/users/123 */
/**TERMİNAL KOMUTLARI
 * NPM İNSTALL
 * CLEAR
 * NPM RUN DEV
 */

/**ARKA UÇ SUNUCUSUNU VE ÖN UÇ SUNUCUSUNU BAĞLAYABİLMEK İÇİN 2'SİNDE DE NPM YÜKLÜ OLMALI 
 * TERMİNALDE BACKEND KALSÖRÜNE GEL
 * 1. KOMUT NPM İNSTALL 
 * 2. KOMUT NODE APP.JS
 */
