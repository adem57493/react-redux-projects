import {log} from '../log.js';
import logoImg from '../assets/logo.png';
export default function Header(){
log('<Header/> rendered',1)/** fonksiyon, Header bileşeni her render edildiğinde çağrılır

Kodda yer alan log('<Header/> rendered', 1) ifadesi, bir logging (kayıt tutma) fonksiyonudur
 ve uygulamanın durumu hakkında bilgi vermek için kullanılır. Birinci Parametre ('<Header/> rendered'): 
 Bu, log fonksiyonuna gönderilen mesajdır. İkinci Parametre (1): Bu sayı ise loglamanın seviyesi olabilir.
  Log fonksiyonları genellikle farklı seviyelerde kayıt tutar (örneğin, error, warn, info, debug). */

    return <header id="main-header">
        <img src={logoImg} alt="Magnifying glass analyzing a document" />
        <h1>React - Behind The Scenes</h1>
    </header>
}