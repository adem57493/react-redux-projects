import { useState } from "react"
import Review from "./Review.jsx";
//TWO WAY BİNDİNG=ÇİFT YÖNLÜÜ VERİ BAĞLAMA
//DRAFT=TASLAK
function App() {
  const [studentName,setStudentName]=useState('')
 const [feedback,setFeedBack]=useState('')

function handleChangeName(event){
  setStudentName(event.target.value);
}

 function handleSomeFeedback(event){
   setFeedBack(event.target.value)

 }
  return (
    <>
   <section id="feedback">

    <h2>Please share some feedback</h2>
    <p>
      <label >your feedback</label>
      <textarea onChange={handleSomeFeedback}  value={feedback}></textarea>
    </p>

    <p>
      <label >Your name</label>
      <input  type="text" onChange={handleChangeName} value={studentName} />
    </p>
   </section>

   <section id="draft">
    <h2>Your Feedback</h2>
    <Review  feedback={feedback}  name={studentName}/>
     <p>
      <button>Save</button>
     </p>
    
    </section></>
  )
}

export default App;
