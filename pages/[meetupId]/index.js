import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient,ObjectId } from "mongodb";
export default function MeetupDetail(props) {
  return (
    <MeetupDetails
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
 
export async function getStaticPaths(){
  
  const client= await MongoClient.connect('mongodb+srv://mulkijeetu:jeevankumar@cluster0.lfcvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  const db=client.db()
  const meetupsCollection=db.collection('meetups');
  const meetups= await meetupsCollection.find({},{_id:1}).toArray();
   client.close();
  return {
   fallback:false,
    paths:meetups.map((meetup)=>({
      params:{meetupId:meetup._id.toString()}
    })),
  }
}


export async function getStaticProps(context){
  const meetupId=context.params.meetupId;
  console.log(meetupId)
  const client= await MongoClient.connect('mongodb+srv://mulkijeetu:jeevankumar@cluster0.lfcvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  const db=client.db()
  const meetupsCollection=db.collection('meetups');
  const selectedData= await meetupsCollection.findOne({_id:ObjectId(meetupId)});
  setTimeout(()=>{
  console.log("Selected data ",selectedData)
  },2000)
   client.close();

return{
 props:{
  meetupData:{
    id:selectedData._id.toString(),
    image:selectedData.image,
      title:selectedData.title,
      address:selectedData.address,
      description:selectedData.description,
      
  },
}}
}
