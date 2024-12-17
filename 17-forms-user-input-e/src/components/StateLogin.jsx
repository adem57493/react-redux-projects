import { useState } from "react";
export default function Login() {

  // const [enteredEmail,setEnteredEmail]=useState('');
  // const [enteredPassword,setEnteredPassword]=useState('');
 const [enteredValues,setEnteredValues]=useState({
  email:'',
  password:''
 });

 const [didEdit,setDidEdit]=useState({email:false,password:false})

 const emailIsInvalid=didEdit.email && !enteredValues.email.includes('@');

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
      /**...prevValues amacı
       * urada password kaybolur, çünkü yeni nesne yalnızca email içerir.

Aynı şekilde, identifier "password" olduğunda:

javascript
Kodu kopyala
{ password: "newPassword" }
Bu sefer email kaybolur.

2. ...prevValues ile Önceki Durumu Koruma:
...prevValues kullanarak, önceki değerler (örneğin email ve password) korunur ve yalnızca 
güncellenmesi gereken alan (örn. email veya password) yeni değerle değiştirilir:
       */
    )
      
    )

    setDidEdit(prevEdit=>({/**Kullanıcı input alanına yeni bir şey yazmaya başladığında,
       artık o girdiyi düzeltmeye çalışıyordur. Bu nedenle, onChange tetiklendiğinde setDidEdit 
       ilgili alan için tekrar false yapılır */
    
/**Neden Tekrar false Yapıyoruz?
Doğrulama Mesajını Gizlemek İçin: */
      ...prevEdit,
      [identifier]:false
    }))
  }

  function handleInputBlur(identifier){
    /**Bu fonksiyon, bir input odaktan çıktığında (onBlur olayı tetiklendiğinde) çağrılır */
/**ullanıcı bir input alanına odaklanıp çıktıktan sonra (odak kaybı), onBlur olayı tetiklenir
 *  ve setDidEdit bu alan için true olarak ayarlanır: */
    setDidEdit(prevEdit=>({
    ...prevEdit,
    [identifier]:true
    }))

  }

  return (//html'de for'un karşılığı react'da htmlFor
    //form onSubmit={handleSubmit} otamatik olarak olay nesnesi alacağız

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email"
          onBlur={()=>handleInputBlur('email')} name="email"
           onChange={(event)=>handleInputChange('email',event.target.value)}
           value={enteredValues.email}/>

           <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
           </div>
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
