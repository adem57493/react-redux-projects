import { useRef } from "react";
import Input from "./Input";
export const userData={name:'',email:''}
function App() {
  const name=useRef()//bu referanslar kullanıcının girdiği input verilerine erişmek için kullanılır
  const email=useRef()

function handleSaveData(){
    const enteredName=name.current.value;//name referansına bağlı olan inputtaki kullanıcının girdiği değer
    const enteredEmail=email.current.value;

    userData.name=enteredName;
    userData.email=enteredEmail;
    console.log(userData);
}
  return (
    <div id="app">
      <Input type="text" label="your name" ref={name}/>
      <Input type="email" label="your email" ref={email}/>
      <p id="actions">
        <button onClick={handleSaveData}>Save Data</button>
      </p>
    </div>
  )
}

export default App;
