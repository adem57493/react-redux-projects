import {useState,useRef} from 'react';
function App() {
  
  const filePicker=useRef();//filePicker adında referans oluşturulur daha sonra bu referans input elemanına bağlancktır

  function handleStartPickImage(){
    filePicker.current.click();//filePicker.current input elemanına erişir 
  }
  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
      <input data-testid="file-picker" type="file" accept="image/*" ref={filePicker}/>
        <button onClick={handleStartPickImage}>pick image</button>
        </p>
    </div>
  )//input elementine filepicker referansını bağlar
}//<input type="file" />: Kullanıcıya bir dosya seçme alanı sunar
//accept="image/*": Bu, yalnızca görüntü dosyalarının seçilmesine izin verir
export default App;
