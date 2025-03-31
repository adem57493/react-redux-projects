import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
//meetups=buluşmalar

const DUMMY_MEETUPS=[
  {
    id:"m1",
    title:"a First Meetup",
    image:'',
    adress:'Some adress 5, 12345 Some City',
    description:'This is a first meetup',
  },
  {
    id:"m2",
    title:"a Second Meetup",
    image:'',
    adress:'Some adress 10, 12345 Some City',
    description:'This is a second meetup',
  }
]



function HomePage(props){

  return (
  /**useEffect'in bileşen işlevi yürütüldükten sonra bu işlevi yürütecek
   * bu bileşen ilk kez render edildiğinde loadedMeetups boş olucaktır 2. kez render edildiğinde dolu 
   * olur ancak next.js tarafından otomatik olarak oluşturulan önceden oluşturulmuş html sayfası bu 2. 
   * döngüyü beklemez her zaman ilk render döngüsünün sonucunu alır ardından sayfa tarayıcıda güncellenir
   * sunucuda değil. sayfa ilk render edildiğinde verilere sahip olması için next.js 2 çözüm sunar
   * static site generation ,server side generation 
   * static site generation'da sunucuya istek atıldığında sunucuda anında oluşturulmaz bunun yerine
   *  production için npm run build için önceden oluşturulur next.js varsayılan olarak sayfaları static 
   * site generation'la static oluşturur 
   * 
   * 
   */
  <Fragment>
  <Head>
   <title>React Meetups</title>
   <meta name='description' content='Browse a huge list of highly active React meetups!'/>
    </Head>
    <MeetupList meetups={props.meetups}/>
  </Fragment>
  )
}
/**her sayfaya <Head> eklememizin nedeni her sayfanın kendine özgü başlık ve metadata bilgileri 
 * barındırmasını sağlamaktır SEO(arama motoru optimizasyonu) için
 */

// export async function getServerSideProps(context){/**getStaticProps'dan farkı derleme sırasında değil
//   dağıtımdan sonra sunucuda çalışacak olması */
// //fetch data from the api
// /**her zaman sunucuda çalışacak revalidate kullanmayız çünkü getServerSideProp'u gelen her istek için çalışır */
//  const req=context.req;
//  const res=context.res;
// return{
//   props:{
//     meetups:DUMMY_MEETUPS
//   }
// }/**getStaticProps daha hızlı çünkü veriler önbelleğe alınabilir */

// }
export async function getStaticProps(){/*bileşen işlevi çalışmadan önce çalışır ve gerekli verileri
   yükler,burdaki kodlar asla istemci tarafında çalışmaz derleme (build) sırasında yürütülür sunucuda
   ve client'da değil
   //fetch data from an API always return a object
*/
const client=await MongoClient.connect('mongodb+srv://ademtopcu714:h1h1@cluster0.urccy.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
//client veritabanına yapılan bağlantıyı temsil eder
const db=client.db();//veritabanıyla etkileşime geçmemizi sağlar

const meetupCollection=db.collections('meetups');//meetups adlı koleksiyona ulaşır yoksa oluşturur
const meetups=await meetupCollection.find().toArray();//bu koleksiyondaki tüm belgeleri bulur
//toArray böylece bir belge dizisi alırız
client.close();
return{/**mongoDB'de _id alanı objectId türündedir ,eğer meetups'ı doğrudan döndürseydik gereksiz meta 
  verileri de props içinde yer alırdı  */
 props:{//yukarıya props olarak aktarılır
  meetups:meetups.map(meetup=>({
    title:meetup.title,
    adress:meetup.adress,
    image:meetup.image,
    id:meetup._id.toString()
  })

  )
 },
 revalidate:10/*veriler değişirse kullanlır bir sayı ister next.js'den gelen bir istek için
  bu sayfayı yeniden oluşturana kadar bekleyeceği sn sayısıdır yani sayfa sadece derleme işlemi
  sırasında değil aynı zamanda sunucuda her 10snde bir yeniden oluşturulacaktır*/
}


 }
export default HomePage();
//NPM RUN BUİLD
// /meetupId sayfasını sonra server side generation sayfasına dönüştürücez
//NPM INSTALL MONGODB
/**şimdi deploy etmek istiyoruz yani uygulamayı uzak bir yere koymak istiyoruz */
/**versel next.js uygulamalarımızı barındırmamızı sağlar */
/**GİT ADD .
 * GİT COMMİT -M "ready for deployment"
 */