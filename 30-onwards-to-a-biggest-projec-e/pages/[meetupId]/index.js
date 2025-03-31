import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient,ObjectId } from 'mongodb';
import MeetupDetail from "@/components/meetups/MeetupDetail";

function MeetupDetails(props) {

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}/>
      </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      adress={props.meetupData.adress}
      description={props.meetupData.description}
    />
</Fragment>
  )

}

export async function getStaticPaths() {/**dinamik değerlerin önceden olşturulması gerekir çünkü 
  getStaticProps'da sayfalar build esnasında oluşturulurdu */

  const client = MongoClient.connect('mongodb+srv://ademtopcu714:h1h1@cluster0.urccy.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();
  const meetupCollection = db.collections('meetups');
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();/**ilk obje {} tüm belgeleri
   getir anlamına gelir ,{_id:1} sadece _id alanlanını getir diğer tüm alanları gizle*/
  client.close();

  return {
    fallback: false,/**getStaticPaths tarafından döndürülmeyen herhangi bir rota için 404 sayfası 
    gösterilir sadece m1,m2 yolları erişilebilir olacak*/
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
    /**herbiri params özelliğine shp nesnelerden oluşan bir dizidir */

  }

}

export async function getStaticProps(context) {//build sırasında çalışır

  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = MongoClient.connect('mongodb+srv://ademtopcu714:h1h1@cluster0.urccy.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();
  const meetupCollection = db.collections('meetups');
  const selectedMeetup=await meetupCollection.findOne({_id:ObjectId(meetupId)});

  client.close();
  return {
    props: {
      meetupData: {
        id:selectedMeetup._id.toString(),
        title:selectedMeetup.title,
        adress:selectedMeetup.adress,
        image:selectedMeetup.image,
        description:selectedMeetup.description
      }
    }
  }

}

export default MeetupDetails;/**MeetupDetails getStaticProps tarafından sağlanan verilerle MeetupDetail
bileşenini render eder */