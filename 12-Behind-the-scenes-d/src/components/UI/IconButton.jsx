import { log } from '../../log.js';
import { memo } from 'react';

const IconButton= memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
})

export default IconButton;/*bu IconButton tekrar çalıştırılmaz çünkü memo ile sardık değişen bir
 şey olmadığı sürece yeniden çalıştırılmıyor children yani yazılar aynı icon aynı ...props da 
 bir fonksiyon bileşen her render edildiğinde farklı bir nesne olrak yüklendiğinde yeniden 
 çağrılıyordu bu da IconButton'ın yeniden çağrılmasına sebep oluyordu o yüzden useCallBack ile
  sardık*/
