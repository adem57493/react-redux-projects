import {useState} from 'react';
import {styled} from 'styled-components';
import Button from './Button.jsx'
import Input from './Input.jsx';




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
     <div id="auth-inputs" className='w-full max-w-sm p-8 mx-auto rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800'>

      <div className='flex flex-col gap-2 mb-6'>
      
            <Input label='Email'invalid={emailNotValid} type="email" //dıştaki süslü parantez javascript kodunu jsx içine yerleştirmek için kullanılır,2. süslü parantez javascript nesnesini belirtir css özelliklerini tanımlamak için javascript nesnesi kullanıyoruz
          //  style={{backgroundColor:emailNotValid?'#fed2d2':'#d1d5db'}}//dış süslü parantez jsx'de javascript ifadesi olduğunu gösterir,iç süslü parantez stil kurallarının bir javascript nesnesi olduğunu belirtir
           
             onChange={(event)=>handleInputChange('email',event.target.value)} />
        
      
            <Input  invalid={passwordNotValid} label="Password" type="password"
          
              onChange={(event)=>handleInputChange('password',event.target.value)} />
      
      </div>

      <div className="flex justify-end gap-4">
        <button type='button' className='text-amber-400 hover:text-amber-500'>Create a new account</button>
        <Button  onClick={handleLogin}>Sign In</Button>
      </div>
     </div>
        
    )//npm install styled-components sonra npm run dev sunucuyu yeniden başlatmam gerekir
}//npm install -D tailwindcss talwind css web sayfasında
//npx tailwindcss init

/*tailwind'in web sayfasındaki cssleri yapıştırdık ayrıca tailwind-config.js'deki contenti oradakini kopyaladık buraya yapıçtırdık*/