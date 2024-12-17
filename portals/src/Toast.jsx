import {createPortal} from 'react-dom';


export default function Toast({message}){

    return(
        createPortal(
//aside ana içerikten bağımsız ek bilgi
   <aside className="toast" data-testid="toast">
    <p>{message}</p>
   </aside>,document.querySelector('body')
        )
      

    )
}