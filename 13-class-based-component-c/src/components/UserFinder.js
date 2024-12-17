import { Fragment, useState, useEffect,Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component{
  constructor(){
    super();
    this.state={
      filteredUsers:DUMMY_USERS,
      searchTerm:''
    }
  }

  componentDidMount(){
  //send HTTP request...
    this.setState({filteredUsers:DUMMY_USERS})
  }
  componentDidUpdate(prevProps,prevState){
   if(prevState.searchTerm !==this.state.searchTerm){
    this.setState({filteredUsers: DUMMY_USERS.filter((user) => user.name.includes(this.state.searchTerm))})
   }
  
  }
  searchChangeHandler(event){
  this.state({searchTerm:event.target.value})
  }

  render() {
    return(
      <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={this.searchChangeHandler.bind(this)} />
      </div>
      <Users users={this.state.filteredUsers} />
    </Fragment>
    )
  }
}
// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');//arama çubuğuna yazılan isim
// //filteredUsers kullanıcı listesinin filtrelenmiş hali varsayılan olarak DUMMY_USERS atanmıştır
//   useEffect(() => {//kullanıcının arama terimi değiştiğinde kullanıcı listesi filtrelenir
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);//kullanıcı arama çubuğuna bir şey yazdığında searchterm durumunu günceller
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;