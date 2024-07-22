import { useNavigate } from 'react-router-dom'
import NewMeetupForm from "../components/meetups/NewMeetupForm"

const NewMeetup = () => {
  const navigate = useNavigate();

  function addMeetupHandler(meetupData) {
    fetch('https://react-project-5e3c2-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type':'application/json'
        }
      }
    ).then(() => {
      navigate('/');
    });
  }

  return <>
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
  </>
}

export default NewMeetup