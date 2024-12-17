import {useState} from 'react';
import {styled} from 'styled-components';

const ControlContainer= styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

`

const Label=styled.label`
display: block;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7280;
`

const Input=styled.input`
 width: 100%;
    padding: 0.75rem 1rem;
    line-height: 1.5;
    background-color: #d1d5db;
    color: #374151;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
        <p className='paragraph'>
            <Label  className={`${emailNotValid?'invalid':''}`}>Email</Label>
            <Input type="email" //dıştaki süslü parantez javascript kodunu jsx içine yerleştirmek için kullanılır,2. süslü parantez javascript nesnesini belirtir css özelliklerini tanımlamak için javascript nesnesi kullanıyoruz
          //  style={{backgroundColor:emailNotValid?'#fed2d2':'#d1d5db'}}//dış süslü parantez jsx'de javascript ifadesi olduğunu gösterir,iç süslü parantez stil kurallarının bir javascript nesnesi olduğunu belirtir
            className={emailNotValid?'invalid':undefined}
             onChange={(event)=>handleInputChange('email',event.target.value)} />
        </p>
        <p>
            <Label  className={`${emailNotValid?'invalid':''}`} >Password</Label>
            <Input type="password"
            className={passwordNotValid?'invalid':undefined}
              onChange={(event)=>handleInputChange('password',event.target.value)} />
        </p>
      </ControlContainer>

      <div className="actions">
        <button type='button' className='text
        -button'>Create a new account</button>
        <button className='button' onClick={handleLogin}>Sign In</button>
      </div>
     </div>
        
    )//npm install styled-components sonra npm run dev sunucuyu yeniden başlatmam gerekir
}