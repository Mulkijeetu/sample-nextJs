import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from 'mongodb';

const DUMMY_MEETUPS = [
  {
    id: "m1",
    titel: "A first Meetup",
    image: "https://source.unsplash.com/user/c_v_r/1900x800",
    address: "Some address first meetup",
    description: "This is first meetup",
  },
  {
    id: "m2",
    titel: "A second Meetup",
    image: "https://source.unsplash.com/user/c_v_r/100x100",
    address: "Some address second meetup",
    description: "This is second meetup",
  },
  {
    id: "m3",
    titel: "A third Meetup",
    image: "https://source.unsplash.com/user/c_v_r/1900x800",
    address: "Some address third meetup",
    description: "This is third meetup",
  },
];
export default function HomePage(props) {
  return (
      <MeetupList meetups={props.meetups} />
  );
}

export async function getStaticProps(){

 const client= await MongoClient.connect('mongodb+srv://mulkijeetu:jeevankumar@cluster0.lfcvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  const db=client.db()
  const meetupsCollection=db.collection('meetups');
  const meetups= await meetupsCollection.find({}).toArray();

  return {
        props:{
       meetups:meetups.map(meetup=>({
         title:meetup.title,
         address:meetup.address,
         image:meetup.image,
         id:meetup._id.toString()
       }))
        }
    }
}
