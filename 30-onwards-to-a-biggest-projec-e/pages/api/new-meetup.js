//api rotaları her zaman sunucuda çalışacak istemcide değil
// /api/new-meetup
import { MongoClient } from 'mongodb';//bağlantı kurmamızı sağlayan sınıf

async function handler(req, res) {/**gelen http(post) isteklerini işleyecek ve veritabanına bağlanacak
   api route(handler)  fonksiyonu tanımlanıyor */

    if (req.method == 'POST') {
        const data = req.body;
        const { title, image, address, description } = data;
        const client = await MongoClient.connect('mongodb+srv://ademtopcu714:h1h1@cluster0.urccy.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
      //client genelde veritabanına yapılan bağlantıyı temsil eder
        const db = client.db();/**bağlantı olunca client adlı bir nesne döner bu nesne mongodb ile
         etkileşime geçmemizi sağlar client.db() veritabanıyla etkileşime geçmemizi sağlar */
        const meetupCollection = db.collection('meetups');//meetups adlı koleksiyon oluşturur
        const result = await meetupCollection.insertOne(data);//belke ekler
        console.log(result);//belge yazdırılır sonuç genelde eklenen belgenin kimliğini içerir
        client.close();//bağlantı kapatılır
        res.status(201).json({ message: 'Meetup inserted!' });
    }
    /**bu kod her zaman sunucuda çalışacak bilgileri saklamak güvenli */
}//?'den hemen önce herhangi bir database adı giriyoruz 

export default handler;