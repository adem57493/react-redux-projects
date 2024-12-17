import { useState } from "react";//kullanıcı arayüzünü güncellememizi sağlar

// export default function Player({name,symbol}){
//   const [isEditing,setIsEditing]=useState(false);

//   function handleEditClick(){

//    setIsEditing(true);

//   }
// return(

//     <li>
//     <span className="player">
//      <span className="player-name">{name}</span> 
//      <span className="player-symbol">{symbol}</span>
//      </span>
//      <button onClick={handleEditClick}>Edit</button>
//       </li>


// );


// }


// export default function Player({name,symbol}){
//     const [isEditing,setIsEditing]=useState(false);
  
//     function handleEditClick(){
  
//      //setIsEditing(true);
//      //setIsEditing(!isEditing) durumunuzu o durumun önceki değerine göre güncellerken sahip olmak istediğiniz yeni durum değeri yerine o durumu güncelleyen bir fonksiyona geçirmelisiniz buraya aktardığınız fonksiyon react tarafından çağrılacak ve o anki state değerini alacaktır bu fonks daha sonra ayarlamak istediğiniz durumu döndürmeli 
//      //setIsEditing(true); böyle yaptığımızda react tarafından gelecekte yapılmak üzere planlanır
//      setIsEditing(editing=>!editing);//eğer bundan bir tane daha yaparsak hiçbir şey olmaz çünkü 1.sinde false'dan true'ya geçer 2.sinde truedan false'a geçer edit düğmesi değişmez çünkü anında gerçekleşir ama setIsEditing(!isEditing) bunu 2 defa yaparsak editing düğmesi save'a geçer aynı kalmaz çünkü gelecekte yapılmak üzere
//     }

//     let playerName=  <span className="player-name">{name}</span> 
//     let btnCaption='Edit';
//     if(isEditing){

//         playerName=<input required type="text" value={name} />//value üzerinde yazan
//         btnCaption="Save";
//     }
//   return(
  
//       <li>
//       <span className="player">
//         {playerName}
//        <span className="player-symbol">{symbol}</span>
//        </span>
//        <button onClick={handleEditClick}>{btnCaption}</button>
//        {/* <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button> */}
//         </li>
  
  
//   );
  
  
//   }


// export default function Player({initialName,symbol}){
//     const [playerName,setPlayerName]=useState(initialName)
//     const [isEditing,setIsEditing]=useState(false);
  
//     function handleEditClick(){
  
//      //setIsEditing(true);
//      //setIsEditing(!isEditing) durumunuzu o durumun önceki değerine göre güncellerken sahip olmak istediğiniz yeni durum değeri yerine o durumu güncelleyen bir fonksiyona geçirmelisiniz buraya aktardığınız fonksiyon react tarafından çağrılacak ve o anki state değerini alacaktır bu fonks daha sonra ayarlamak istediğiniz durumu döndürmeli 
//      //setIsEditing(true); böyle yaptığımızda react tarafından gelecekte yapılmak üzere planlanır
//      setIsEditing(editing=>!editing);//eğer bundan bir tane daha yaparsak hiçbir şey olmaz çünkü 1.sinde false'dan true'ya geçer 2.sinde truedan false'a geçer edit düğmesi değişmez çünkü anında gerçekleşir ama setIsEditing(!isEditing) bunu 2 defa yaparsak editing düğmesi save'a geçer aynı kalmaz çünkü gelecekte yapılmak üzere
//     }

//     function handleChange(event){
//       setPlayerName(event.target.value);//giriş alanındaki değeri alır
//     }

//     let editiblePlayerName=  <span className="player-name">{playerName}</span> 
//     let btnCaption='Edit';
//     if(isEditing){

//         editiblePlayerName=<input required type="text" value={playerName} onChange={handleChange} />//oyunvu ismini değiştirmeye çalışıyoruz ama değişmiyor çünkü value={name} hepsinin üzerine yazılır
//         btnCaption="Save";
//     }
//   return(
  
//       <li>
//       <span className="player">
//         {editiblePlayerName}
//        <span className="player-symbol">{symbol}</span>
//        </span>
//        <button onClick={handleEditClick}>{btnCaption}</button>
//        {/* <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button> */}
//         </li>
  
  
//   );
  
  
//   }




export default function Player({initialName,symbol,isActive,onChangeName}){
  const [playerName,setPlayerName]=useState(initialName)
  const [isEditing,setIsEditing]=useState(false);

  function handleEditClick(){

   //setIsEditing(true);
   //setIsEditing(!isEditing) durumunuzu o durumun önceki değerine göre güncellerken sahip olmak istediğiniz yeni durum değeri yerine o durumu güncelleyen bir fonksiyona geçirmelisiniz buraya aktardığınız fonksiyon react tarafından çağrılacak ve o anki state değerini alacaktır bu fonks daha sonra ayarlamak istediğiniz durumu döndürmeli 
   //setIsEditing(true); böyle yaptığımızda react tarafından gelecekte yapılmak üzere planlanır
   setIsEditing(editing=>!editing);//eğer bundan bir tane daha yaparsak hiçbir şey olmaz çünkü 1.sinde false'dan true'ya geçer 2.sinde truedan false'a geçer edit düğmesi değişmez çünkü anında gerçekleşir ama setIsEditing(!isEditing) bunu 2 defa yaparsak editing düğmesi save'a geçer aynı kalmaz çünkü gelecekte yapılmak üzere
   if(isEditing){
    onChangeName(symbol,playerName)
   }
  }

  function handleChange(event){
    setPlayerName(event.target.value);//giriş alanındaki değeri alır
  }

  let editiblePlayerName=  <span className="player-name">{playerName}</span> 
  let btnCaption='Edit';
  if(isEditing){

      editiblePlayerName=<input required type="text" value={playerName} onChange={handleChange} />//oyunvu ismini değiştirmeye çalışıyoruz ama değişmiyor çünkü value={name} hepsinin üzerine yazılır
      btnCaption="Save";
  }
return(

    <li className={isActive?'active':undefined}>
    <span className="player">
      {editiblePlayerName}
     <span className="player-symbol">{symbol}</span>
     </span>
     <button onClick={handleEditClick}>{btnCaption}</button>
     {/* <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button> */}
      </li>


);


}