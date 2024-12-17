import { useState } from "react";
export default function Login() {

  // const [enteredEmail,setEnteredEmail]=useState('');
  // const [enteredPassword,setEnteredPassword]=useState('');
 const [enteredValues,setEnteredValues]=useState({
  email:'',
  password:''
 });
  function handleSubmit(event){
event.preventDefault();
console.log(enteredValues);

 setEnteredValues(
  {email:'',password:''}
);

  }

  function handleInputChange(identifier,value){
    setEnteredValues(prevValues=>(
      {...prevValues,
        [identifier]:value
      }
    )
      
    )
  }

  return (//html'de for'un karşılığı react'da htmlFor
    //form onSubmit={handleSubmit} otamatik olarak olay nesnesi alacağız

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"
           onChange={(event)=>handleInputChange('email',event.target.value)}
           value={enteredValues.email}/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
           onChange={(event)=>handleInputChange('password',event.target.value)}
           value={enteredValues.password} />
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
