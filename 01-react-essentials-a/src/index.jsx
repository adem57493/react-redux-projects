 import ReactDOM from "react-dom/client";//ReactDom kütüphanesi, react uygulaması oluşturmak için kullandığımız App bileşeninin içeriğini almaktan sorumlu bileşen
 import App from "./App.jsx";
 import "./index.css";

 const entryPoint=document.getElementById("root");
 ReactDOM.createRoot(entryPoint).render(<App />);

 //bu index.html tarafından yüklenen ilk dosya olduğu için uygulamamızın ana giriş noktasını oluşturur
 //createRoot() bu metot mevcut bir html öğesini girdi olarak alır bu öğe seçilip react projesi için kök olarak ayarlandığında react devam eder
 //createRoot() root element üzerinde yeni bir kök oluşturur
 //.render(<App/>) kısmında react uygulaması <App/> ile başlatılır ve app bileşeni root içerisine render edilir yani bu bileşen içindeki html yapısı çağrılır