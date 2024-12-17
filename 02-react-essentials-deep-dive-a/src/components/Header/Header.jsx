import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';//bu stillerin uygulanabilmesi için içe aktarmalıyız tıpkı index.jsx'deki gibi bu import deyimiyle işlenecek web sayfasına dahil olacaktır


const reactDescriptions=["Fundamantal","Crucial","Core"];

function genRandomInt(max){
return Math.floor(Math.random()*(max+1));
}

export default function Header(){//functional component

  const description=reactDescriptions[genRandomInt(2)]

  return(//parantez tüm bu kodun biribirine ait olduğunu belirtmek için
    <header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>{description} React concepts you will need for almost any app you are going to build!</p>
        </header>
  )
}