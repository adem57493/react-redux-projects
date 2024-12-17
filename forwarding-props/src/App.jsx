import Input from "./Input.jsx";
//FORWARDİNG PROPS=ÖZELLİKLERİ İLETME

// function Button({ type, ...props }) {
//   return <button type={type} {...props}>Click Me</button>;
// }
//...props ile Button bileşenine gelen tüm özellikler <button> elementine iletiliyor bu işleme forwarding props denir
//bir react bileşenine gelen tüm propları bir html elementine aktarmak için kullanılır
function App() {
  

  return (
   <div id="content">
    <Input type="text" placeholder="your name"/>
    <Input richText placeholder="Your message"/>
   </div>
  )
}

export default App;
