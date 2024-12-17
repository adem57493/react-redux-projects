import {useState} from 'react';

export default function AuthInputs(){
 const [submitted,setSubmitted]=useState(false);
const [enteredEmail,setEnteredEmail]=useState('')
 const [enteredPassword,setEnteredPassword]=useState('')
 function handleLogin(){
    setSubmitted(true);
 }

 function handleInputChange(identifier,value){
   if(identifier==='email'){
    setEnteredEmail(value)
   }
   else{
    setEnteredPassword(value)
   }

 }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;//trim() şifrenin başında ve sonundaki boşluklar temizlenir

    return(
     <div id="auth-inputs">

      <div className="controls">
        <p>
            <label>Email</label>
            <input type="email" className={emailNotValid?'invalid':undefined} onChange={(event)=>handleInputChange('email',event.target.value)} />
        </p>
        <p>
            <label >Password</label>
            <input type="password" className={passwordNotValid?'invalid':undefined} onChange={(event)=>handleInputChange('password',event.target.value)} />
        </p>
      </div>

      <div className="actions">
        <button type='button' className='text
        -button'>Create a new account</button>
        <button className='button' onClick={handleLogin}>Sign In</button>
      </div>
     </div>
        
    )
}