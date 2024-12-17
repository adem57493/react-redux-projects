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
    color: ${({$invalid})=>$invalid?'#f87171':'#6b7280'};
`//arrow function kullanmamızın sebebi stilin dinmaik olmasını sağlamak bileşnin durumuna,proplarına bağlı olarak farklı değerler döndürmek Label ve Input bileşenlerinin geçerli ya da geçersiz olup olmadığını kontrol ediyoruz buna göre renk atıyoruz
//ilk $ işareti kullanılan değişkenin özel olduğunu belirtir 2. $ işareti template literal içinde string ifadelerin interpolasyonu için kullanılır
//ilk $invalid derken dışında süslü parantez var neden 2. kez $invalid kullanırken dışına süslü parantez koymadık
//sebebi ilk $invalid'in dışındaki props içinden $invalid prop'unu ayıklamak için kullanılıyor. props'un bir nesne olduğunu ve bu nesne içindeki $invalid prop'unu ayıkladığımızı ifade etmiş oluyoruz
//ikinci $invalid'in dışında süslü parantez kullanmadık çünkü artık bir değişken direkt kullanıyoruz
const Input=styled.input`
 width: 100%;
    padding: 0.75rem 1rem;
    line-height: 1.5;
    background-color:${({$invalid})=>$invalid?'#fed2d2':'#d1d5db'};
    color: ${({$invalid})=>$invalid?'#ef4444':'#374151'};
    border: 1px solid ${({$invalid})=>$invalid?'#f73f3f':'transparent'};
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

const Button=styled.button`
  padding: 1rem 2rem;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 0.25rem;
    color: #1f2937;
    background-color: #f0b322;
    border-radius: 6px;
    border: none;

    &:hover{
     background-color: #f0920e;
    }

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
            <Label $invalid={emailNotValid}>Email</Label>
            <Input $invalid={emailNotValid} type="email" //dıştaki süslü parantez javascript kodunu jsx içine yerleştirmek için kullanılır,2. süslü parantez javascript nesnesini belirtir css özelliklerini tanımlamak için javascript nesnesi kullanıyoruz
          //  style={{backgroundColor:emailNotValid?'#fed2d2':'#d1d5db'}}//dış süslü parantez jsx'de javascript ifadesi olduğunu gösterir,iç süslü parantez stil kurallarının bir javascript nesnesi olduğunu belirtir
           
             onChange={(event)=>handleInputChange('email',event.target.value)} />
        </p>
        <p>
            <Label $invalid={passwordNotValid} >Password</Label>
            <Input  $invalid={passwordNotValid} type="password"
          
              onChange={(event)=>handleInputChange('password',event.target.value)} />
        </p>
      </ControlContainer>

      <div className="actions">
        <button type='button' className='text
        -button'>Create a new account</button>
        <Button  onClick={handleLogin}>Sign In</Button>
      </div>
     </div>
        
    )//npm install styled-components sonra npm run dev sunucuyu yeniden başlatmam gerekir
}