//TABBUTTON=SEKME DÜĞMESİ

// export default function TabButton(props){
   
//     return(
//         <li><button>{props.children}</button></li>
//     )
// }
//HANDLECLİCK=TIKLAMAYI İŞLEMEK
export default function TabButton({children,isSelected,...props}){//props fonksiyona dışarıdan iletilen verileri içerir
  console.log("TABBUTTON COMPONENT EXECUTING!")//...PROPS EXAMPLES.JSX'DE YER ALAN TABBUTTONDAKİ PROPSLARIN BURAYA OTOMATİK OLARAK GETİRİLMESİNİ SAĞLAR BÖYLECE TEK TEK BELİRTMEYİZ
    // function handleClick(){
    //     console.log("Hello world!");//onSelect ismi önemsiz istediğimiz ismi verebilirdik
    // }
    return(//onClick butona tıklandığında handleClick'in çalışmasını sağlar
      //  <li><button onClick={handleClick}>{props.children}</button></li>
        <li><button className={isSelected?'active':undefined} {...props}>{children}</button></li>
    )//{props.children} bu bileşene verilen içeriklerin butonun içine yerleştirileceği anlamına gelir örneğin <TabButton></TubButoon> click me yazdığımızda butonun içinde click me yazar
}   
//butona tıklandığında dışardan gelen onselect fonks çalıştırılıyor
//onClick={handleClick()} fonksiyona parantez eklersek butona tıklanılmasını beklemeden fonks çalışır parantezsiz kullanırsak javascript bu fonksiyon onclick olayına atar ve tıklanma anında çalıştırır
//<TabButton>Components</TabButton>   children bunların arasındaki metni ifade eder

// export default function TabButton({children}){

//     return(
//         <li><button>{children}</button></li>
//     )
// }