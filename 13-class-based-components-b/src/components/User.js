import classes from './User.module.css';
import {Component} from 'react';
class User extends Component{//sınıf tabanlı blşenler oluşturmak için Component extend edilir

 render(){//sınıf tabanlı bileşenlerde arayüzü tanaımlamak için render metodu zorunludur
  return <li className={classes.user}>{this.props.name}</li>;//sınıf tabanlı bileşenlerde propslara this.props ile erişilir
 }
}


export default User;
