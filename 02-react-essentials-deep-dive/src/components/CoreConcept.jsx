//PROPS=ÖZELLİKLER
export default function CoreConcept(props){//props fonksiyona dışarıdan geçirilen verilerdir bileşen bu verilere erişerek dinamik içerik oluşturur
    return (//props dışardan gelen verileri temsil eder
    <li>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
    );
  }
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