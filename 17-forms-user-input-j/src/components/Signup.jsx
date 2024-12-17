import { useState } from "react";

export default function Signup() {

  const [passwordsAreNotEqual,setPasswordsAreNotEqual]=useState(false);
  function handleSubmit(event){

    event.preventDefault();
/**new FormData(event.target):
FormData API'si kullanılarak, formun tüm giriş değerleri yakalanır.
event.target ile form elemanına erişilir. */
/**fd.getAll('acquisition'):
name="acquisition" olan tüm checkbox değerlerini bir dizi olarak döndürür. */
    const fd=new FormData(event.target);//tüm input alanları name property'sine sahip olmalı
    const acquisitionChannel=fd.getAll('acquisition');
   
   // const enteredEmail= fd.get('email');
  
  const data=Object.fromEntries(fd.entries());
  /**fd.entries():
Formdaki tüm alanları [key, value] çiftleri olarak döndürür.
Object.fromEntries ile bu çiftler bir nesneye dönüştürülür.
data.acquisition ile acquisitionChannel dizisi bu nesneye eklenir. */
  data.acquisition=acquisitionChannel;

  if(data.password!==data['confirm-password']){
    setPasswordsAreNotEqual(true);
    return;
  }
 console.log(data);//kullanıcıdan alınan tüm from verileri yazdırılır

 event.target.reset();
 /**fd.getAll('acquisition'):
name="acquisition" olan tüm işaretli checkbox'ların değerlerini bir dizi olarak döndürür. */
  }

  //input etiketindeki type property'si sadece email türündeki verilerin girilmesini sağlar
    return (
      <form onSubmit={handleSubmit}>
        <h2>Welcome on board!</h2>
        <p>We just need a little bit of data from you to get you started 🚀</p>
  
        <div className="control">
          <label htmlFor="email">Email</label>
          <input id="email" required type="email" name="email" />
        </div>
  
        <div className="control-row">
          <div className="control">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required minLength={6} name="password" />
          </div>
  
          <div className="control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              required
            />
            <div className="control-error">
              {passwordsAreNotEqual && <p>Passwords must match.
                </p>}
            </div>
          </div>
        </div>
  
        <hr />
  
        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" required />
          </div>
  
          <div className="control">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name" required />
          </div>
        </div>
  
        <div className="control">
          <label htmlFor="phone">What best describes your role?</label>
          <select id="role" name="role" required>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="employee">Employee</option>
            <option value="founder">Founder</option>
            <option value="other">Other</option>
          </select>
        </div>
  
        <fieldset>
          <legend>How did you find us?</legend>
          <div className="control">
            <input
              type="checkbox"
              id="google"
              name="acquisition"
              value="google"
            />
            <label htmlFor="google">Google</label>
          </div>
  
          <div className="control">
            <input
              type="checkbox"
              id="friend"
              name="acquisition"
              value="friend"
            />
            <label htmlFor="friend">Referred by friend</label>
          </div>
  
          <div className="control">
            <input type="checkbox" id="other" name="acquisition" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </fieldset>
  
        <div className="control">
          <label htmlFor="terms-and-conditions">
            <input type="checkbox" id="terms-and-conditions" name="terms" required/>I
            agree to the terms and conditions
          </label>
        </div>
  
        <p className="form-actions">
          <button type="reset" className="button button-flat">
            Reset
          </button>
          <button type="submit" className="button">
            Sign up
          </button>
        </p>
      </form>
    );
  }