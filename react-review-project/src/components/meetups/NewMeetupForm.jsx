import { useRef } from 'react'

import classes from './NewMeetupForm.module.css';
import Card from '../UserInterface/Card'

const NewMeetupForm = (props) => {

    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const meetupData = {
            title:enteredTitle,
            image:enteredImage,
            address:enteredAddress,
            description:enteredDescription
        };

        console.log(meetupData);

        props.onAddMeetup(meetupData);
    }

    return <Card>
        <h1>Add New Meetup</h1>
        <form action="" className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="title">Meetup Title</label><br />
                <input type="text" name="title" id="title" ref={titleInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="title">Meetup Image</label><br />
                <input type="url" name="image" id="image" required ref={imageInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="address">Meetup Address</label><br />
                <input type="text" name="address" id="address" ref={addressInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="title">Meetup Description</label>
                <textarea name="" id="description" required rows="5" ref={descriptionInputRef}></textarea>
            </div>
            <div className={classes.actions}>
                <button type='submit'><b>Add Meetup</b></button>
            </div>
        </form>
    </Card>
}

export default NewMeetupForm