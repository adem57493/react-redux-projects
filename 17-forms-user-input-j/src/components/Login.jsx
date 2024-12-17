import { useRef, useState } from "react";

export default function Login() {

  const [emailIsInvalid,setEmailIsInvalid]=useState(false);
 const email=useRef();
 const password=useRef();

  function handleSubmit(event){
event.preventDefault();

const enteredEmail=email.current.value;

const enteredPassword=password.current.value;

const emailIsValid=!enteredEmail.includes('@');

if(!emailIsValid){
  setEmailIsInvalid(true);
  return;
}

setEmailIsInvalid(false);
console.log(enteredEmail,enteredPassword);


  }


  return (//html'de for'un karşılığı react'da htmlFor
    //form onSubmit={handleSubmit} otamatik olarak olay nesnesi alacağız

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email}/>
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button  className="button">Login</button>
      </p>
    </form>
  );/**handleInputChange('password', event.target.value) yapsaydık, onChange olayının tetiklenmesinden 
  bağımsız olarak komponent render edilirken anında çalışır. ve döndürdüğü sonuç onChange propuna atanır */
}/*butonun default davranışını önlemek için type button özelliğini ekledik böylece sayfa yeniden
 yüklenmiyor bu düğmenin artık formu göndermediğinden emin oluyoruz type submit olsaydı böyle
  olmazdı default type submit type,
  bunu yapmanın 2. yolu button'dan type'ı,onClick dinleyicisini kaldırmak ve form etiketine 
  onSubmit olay dinleyicisini eklemek*/
