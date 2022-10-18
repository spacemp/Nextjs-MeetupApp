import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from 'mongodb';

function HomePage(props) {
  
  return <MeetupList meetups={props.meetup} />;
}

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API

//   return {
//     props:{
//       meetup: DUMMYDATA
//     }
//   };
// }

export async function getStaticProps(){
  // fetch data from API
  const client = await MongoClient.connect(
    'mongodb+srv://mhd:123456abcd1@cluster1.4nzfg0l.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetup');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return{
    props:{
      meetup: meetups.map((meetup)=>({
        title:meetup.title,
        address:meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate:1,
  };
}


export default HomePage;
