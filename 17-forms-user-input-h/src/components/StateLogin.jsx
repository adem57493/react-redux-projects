
import Input from './Input.jsx';
import {isEmail,isNotEmpty,hasMinLength} from '../util/validation.js';
import { useInput } from "../hooks/useInput.js";
export default function Login() {
const {value:emailValue,handleInputChange:handleEmailChange,handleInputBlur:handleEmailBlur,hasError:emailHasError}=useInput('',(value)=>isEmail(value) && isNotEmpty(value))

 const {value:passwordValue,handleInputChange:handlePasswordChange,handleInputBlur:handlePasswordBlur,hasError:passwordHasError}=useInput('',(value)=>hasMinLength(value,6))


  function handleSubmit(event) {
    event.preventDefault();

    if(emailHasError || passwordHasError){
      return;
    }
    console.log(emailValue,passwordValue);

    

  }

 

  return (//html'de for'un karşılığı react'da htmlFor
    //form onSubmit={handleSubmit} otamatik olarak olay nesnesi alacağız

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          lable="Email"
          id="email"
           type="email"
            name="email" 
            onBlur={handleEmailBlur} 
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && 'Please enter a valid email!'} />

        <Input
         lable="Password" 
         id="password"
          type="password" 
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password!'} />

      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );/**handleInputChange('password', event.target.value) yapsaydık, onChange olayının tetiklenmesinden 
  bağımsız olarak komponent render edilirken anında çalışır. ve döndürdüğü sonuç onChange propuna atanır */
}/*butonun default davranışını önlemek için type button özelliğini ekledik böylece sayfa yeniden
 yüklenmiyor bu düğmenin artık formu göndermediğinden emin oluyoruz type submit olsaydı böyle
  olmazdı default type submit type,
  bunu yapmanın 2. yolu button'dan type'ı,onClick dinleyicisini kaldırmak ve form etiketine 
  onSubmit olay dinleyicisini eklemek*/
