import {useState} from 'react';
import {styled} from 'styled-components';
import Button from './Button.jsx'
import Input from './Input.jsx';
const ControlContainer= styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

`




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
//yani süslü parantezler React'in JSX yazımında JavaScript ifadelerini kullanabilmemizi sağlıyor, ${} ise string içinde bu ifadeleri birleştirmek için kullanılıyor.
    return(//backstring (``) içine ${} eklenerek dinamik değerler verilebilir template literal(${}) javascripte stringleri birleştirmenin kolay yolu
     <div id="auth-inputs">

      <ControlContainer>
      
            <Input label='Email'invalid={emailNotValid} type="email" //dıştaki süslü parantez javascript kodunu jsx içine yerleştirmek için kullanılır,2. süslü parantez javascript nesnesini belirtir css özelliklerini tanımlamak için javascript nesnesi kullanıyoruz
          //  style={{backgroundColor:emailNotValid?'#fed2d2':'#d1d5db'}}//dış süslü parantez jsx'de javascript ifadesi olduğunu gösterir,iç süslü parantez stil kurallarının bir javascript nesnesi olduğunu belirtir
           
             onChange={(event)=>handleInputChange('email',event.target.value)} />
        
      
            <Input  invalid={passwordNotValid} label="Password" type="password"
          
              onChange={(event)=>handleInputChange('password',event.target.value)} />
      
      </ControlContainer>

      <div className="actions">
        <button type='button' className='text
        -button'>Create a new account</button>
        <Button  onClick={handleLogin}>Sign In</Button>
      </div>
     </div>
        
    )//npm install styled-components sonra npm run dev sunucuyu yeniden başlatmam gerekir
}//npm install -D tailwindcss talwind css web sayfasında
//npx tailwindcss init

/*tailwind'in web sayfasındaki cssleri yapıştırdık ayrıca tailwind-config.js'deki contenti oradakini kopyaladık buraya yapıçtırdık*/