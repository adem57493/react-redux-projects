
import Header from './components/Header/Header.jsx';//Header.jsx'de de Header.css'i dahil ediyoruz header.css'deki stiller her yere uygulanır
import CoreConcepts from './components/CoreConcepts.jsx';
import { useState ,Fragment} from 'react';
import Examples from './components/Examples.jsx';

//app fonksiyonu sadece bir kere çalışır ama bileşenler birden fazla kere çalışır bu yüzden normalde 
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

  return(//return ifadesiyle bir değer döndürebiliriz fragment'i kaldırırsak header,main olarak 2 değer döndürürüz dışına fragment koyarak 1 değer döndürmüş oluyoruz normalde div koyuyorduk ama fragmentin divden farkı kaynak kodunda gösterilmiyor gereksiz yere kod kullanılmıyor fragment yerine <> </>
    <Fragment>
     <Header />
        <main> 
         <CoreConcepts/>
          <Examples/>
    </main>
    </Fragment>
  );//neden anonim fonksiyon kullanılıyor eğer doğrudan handleSelect('components') yazılsaydı bu bileşen render edilir edilmez çalışırdı ancak anonim fonks kullanarak tıklama olayı gerçekleştiğinde çağırırız
} // TabButton'a onSelect adında prop verilmiş, handleSelect fonksiyonu dışarıdan bileşene prop olarak geçiriliyor,bileşen içinde de props.onSelect olarak tıklanma olayına bağlanıyor

export default App;
//bileşen adları isim çakışmalarını önlemek için büyük adla başlar

// {!selectedTopic? <p>Please select a topic.</p>:null} ifadesinde !selectedTopic selectedTopic ifadesinin boş olup olmadığını kontrol eder bu ifade boşsa true döner eğer true dönerse ekranda please select a topic yazar eğer false dönerse bu blok null döner
// { selectedTopic ? () eğer selected topic boş değilse parantez içindeki html render edilir
// iki noktanın anlamı=>koşul ? doğruysa_bu_dönsün : yanlışsa_bu_dönsün
