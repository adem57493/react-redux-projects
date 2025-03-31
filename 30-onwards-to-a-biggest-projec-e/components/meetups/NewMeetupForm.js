import classes from './NewMeetupForm.module.css';
import Card from '../ui/Card';
import { useRef } from 'react';

function NewMeetupForm(props){
 const titleInputRef=useRef();
 const adressInputRef=useRef();
 const imageInputRef=useRef();
 const descriptionInputRef=useRef();
  function submitHandler(event){
    event.preventDefault();

    const enteredTitle=titleInputRef.current.value;
    const enteredImage=imageInputRef.current.value;
    const enteredAdress=adressInputRef.current.value;
    const enteredDescription=descriptionInputRef.current.value;
   const meetupData={
    title:enteredTitle,
    adress:enteredAdress,
    image:enteredImage,
    description:enteredDescription
   }
   props.onAddMeetup(meetupData);

  }
    return (
        <Card >
        <form className={classes.form} onSubmit={submitHandler}>
         
         <div className={classes.control}>
            <label htmlFor='title'>Meetup Title</label>
            <input type='text' id='title' required ref={titleInputRef}/>
         </div>
         <div className={classes.control}>
            <label htmlFor='image'>Meetup Image</label>
            <input type='url' id='image' required ref={imageInputRef}/>
         </div>
         <div className={classes.control}>
            <label htmlFor='adress'>Adress</label>
            <input type='text' required id='adress' ref={adressInputRef}/>
         </div>
         <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <textarea
             id='description'
             required
             rows='5'
             ref={descriptionInputRef}></textarea>
         </div>
         <div className={classes.actions}>
            <button>Add Meetup</button>
         </div>
        </form>
        </Card>
    )/**labeldaki htmlFor ile inputdaki id arasında ilişki kurularak inputun hangi alana ait olduğu belirlenir
    name alanı ile verilerin sunucuya hangi adla gönderileceği belirlenir */
}

export default NewMeetupForm;