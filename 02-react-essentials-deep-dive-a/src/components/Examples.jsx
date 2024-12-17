import { useState } from "react";
import Section from './Section.jsx';
import { EXAMPLES } from "../data";
import Tabs from './Tabs.jsx';
import TabButton from "./TabButton.jsx";
export default function Examples(){

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
  let tabbContent= <p>Please select a topic.</p>;
  if(selectedTopic){
    (
    tabbContent=<div id="tab-content">
       
    <h3> {EXAMPLES[selectedTopic].title}</h3>
    <p> {EXAMPLES[selectedTopic].description}</p>
    <pre>
      <code> {EXAMPLES[selectedTopic].code}</code>
      </pre>
    </div>)}
return (//bir bileşende propları ayarladığınızda (id="examples") bu proplar otomatik olarak o bileşenin içinde kullanılan jsx koduna iletilmediğidir yani id propu Section.jsx'e iletilmiyor
  //buttonsContainer={menu} yapmadık çünkü bu durumda menu adında bir değişken arar ve bulamaz
    <Section title="Examples" id="examples">/

        <Tabs buttonsContainer="menu" buttons={

          <>
           <TabButton isSelected={selectedTopic=='components'} onClick={()=>handleSelect('components')}>Components</TabButton>
           <TabButton  isSelected={selectedTopic=='jsx'} onClick={()=>handleSelect('jsx')}>JSX</TabButton>
           <TabButton  isSelected={selectedTopic=='props'} onClick={()=>handleSelect('props')}>Props</TabButton>
           <TabButton  isSelected={selectedTopic=='state'} onClick={()=>handleSelect('state')}>State</TabButton>
           </>
        }>
          {tabbContent}
        </Tabs>
            <menu>
            
            </menu>
       
    </Section>)
}