import { useState } from 'react';
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [//örnek=dummy
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

const Users = () => {
  const [showUsers, setShowUsers] = useState(true);//kullanıcı listesinin görünüp görünmdiğini belirler başlangıçta görünür

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);//görünüp görünmediğini tersine çevirir
  };

  const usersList = (
    <ul>
      {DUMMY_USERS.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>//her kullanıcı için <User> bilşenei oluşturur
  );

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>
        {showUsers ? 'Hide' : 'Show'} Users
      </button>
      {showUsers && usersList}
    </div>
  );//eğer showUsers true ise userList ekrana basılır değilse hiçbir şey gösterilmez
};

export default Users;
