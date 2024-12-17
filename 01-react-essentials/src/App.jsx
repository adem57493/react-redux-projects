
import { CORE_CONCEPTS } from './data.js';
import Header from './components/Header/Header.jsx';//Header.jsx'de de Header.css'i dahil ediyoruz header.css'deki stiller her yere uygulanır
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx'; 
import { useState } from 'react';
import { EXAMPLES } from './data.js'; 
//PROPS=ÖZELLİKLER
//CORE CONCEPTS=TEMEL KAVRAMLAR
// function CoreConcept(props){//props fonksiyona dışarıdan geçirilen verilerdir bileşen bu verilere erişerek dinamik içerik oluşturur
//   return (
//   <li>
//     <img src={props.image} alt={props.title} />
//     <h3>{props.title}</h3>
//     <p>{props.description}</p>
//   </li>
//   );
// }


//yukardakinin aynısı
// function CoreConcept({title,description,image}){//props fonksiyona dışarıdan geçirilen verilerdir bileşen bu verilere erişerek dinamik içerik oluşturur
//   return (
//   <li>
//     <img src={image} alt={title} />
//     <h3>{title}</h3>
//     <p>{description}</p>
//   </li>
//   );
// }


//SELECTEDTOPİC=SEÇİLENKONU
// Header bileşeni tekrar çağrılıyor
//... (spread operatörü elemanları bileşenlerine ayırır)
function App(){
//useState() bunu kullanmamızın nedeni uı'daki içerik butona tıklandığında app fonks bir kez çalıştığında dinamik olarak güncellenmiyordu
const [selectedTopic,setSelectedTopic]=useState(null);//bunu react bileşeninin en üst seviyesinde çağırmalıyız
  function handleSelect(selectedButton){//useState ile selectedtopic adında bir durum tanımlıyorsunuz ve başlangıç değeri please click a button setSelectedTopic ise bu durumu değiştirmek için kullanılan fonks
    //selectedButton=>'components','jsx','props','state'
   
   // let tabContent='Please click a button!';
   // console.log("Hello world-selected")
   //tabContent=selectedButton;
  // console.log(selectedButton)
 // console.log(tabContent);
   setSelectedTopic(selectedButton)
   //console.log(selectedTopic)
  }//bileşene 3 prop veriliyor

  console.log("APP COMPONENT EXECUTING"); //UI kısmında içerik değişmiyor yani {tabButton} çünkü App fonksiyonu sadece bir kez çalıştırılır fakat console'da yazdırılıyor çünkü handleSelect birden fazla kere çalıştırılıyor
  return(//normalda return'le 2 değer döndüremeyiz tek değer döndürebiliriz değil mi return'den sonra gelen div'i kaldırırsak header,main olarak 2 değer döndürmüş oluruz tek div içine alarak 1 değer döndürmüş oluyoruz
    <div>
     <Header />
        <main>
          <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
          <CoreConcept title={CORE_CONCEPTS[0].title} description={CORE_CONCEPTS[0].description} image={CORE_CONCEPTS[0].image}/>
          <CoreConcept title={CORE_CONCEPTS[1].title} description={CORE_CONCEPTS[1].description} image={CORE_CONCEPTS[1].image}/>
          <CoreConcept {...CORE_CONCEPTS[2]}/>
          <CoreConcept {...CORE_CONCEPTS[3]}/>
          </ul>
          </section>
          
          <section id="examples">
            <h2>Examples</h2>
            <menu>
            <TabButton isSelected={selectedTopic=='components'} onSelect={()=>handleSelect('components')}>Components</TabButton>
            <TabButton  isSelected={selectedTopic=='jsx'} onSelect={()=>handleSelect('jsx')}>JSX</TabButton>
            <TabButton  isSelected={selectedTopic=='props'} onSelect={()=>handleSelect('props')}>Props</TabButton>
            <TabButton  isSelected={selectedTopic=='state'} onSelect={()=>handleSelect('state')}>State</TabButton>
            </menu>
        {!selectedTopic? <p>Please select a topic.</p>:null}
        { selectedTopic ? (
        <div id="tab-content">
       
        <h3> {EXAMPLES[selectedTopic].title}</h3>
        <p> {EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code> {EXAMPLES[selectedTopic].code}</code>
          </pre>
        </div>):null}
    </section>
    </main>
    </div>
  );//neden anonim fonksiyon kullanılıyor eğer doğrudan handleSelect('components') yazılsaydı bu bileşen render edilir edilmez çalışırdı ancak anonim fonks kullanarak tıklama olayı gerçekleştiğinde çağırırız
} // TabButton'a onSelect adında prop verilmiş, handleSelect fonksiyonu dışarıdan bileşene prop olarak geçiriliyor,bileşen içinde de props.onSelect olarak tıklanma olayına bağlanıyor

export default App;
//bileşen adları isim çakışmalarını önlemek için büyük adla başlar

// {!selectedTopic? <p>Please select a topic.</p>:null} ifadesinde !selectedTopic selectedTopic ifadesinin boş olup olmadığını kontrol eder bu ifade boşsa true döner eğer true dönerse ekranda please select a topic yazar eğer false dönerse bu blok null döner
// { selectedTopic ? () eğer selected topic boş değilse parantez içindeki html render edilir
// iki noktanın anlamı=>koşul ? doğruysa_bu_dönsün : yanlışsa_bu_dönsün
