import React from "react";

const UsersContext=React.createContext({
    users:[]
})

export default UsersContext;
/**Context, React uygulamalarında veriyi prop drilling 
 * yapmadan (yani her bileşen seviyesinde prop geçirerek taşımadan) paylaşmayı sağlar. */
/**Parametre olarak verilen { users: [] } değeri, context'in varsayılan değeridir. Eğer bu context'e 
 * bir Provider ile herhangi bir değer sağlanmazsa, bu varsayılan değer kullanılır. */

/**UsersContext.Provider:
Amaç: Context'in verisini tanımlamak ve bu veriyi alt bileşenlere erişilebilir hale getirmek.

import UsersContext from './UsersContext';

const App = () => {
  const userData = { users: ['Alice', 'Bob', 'Charlie'] };

  return (
    <UsersContext.Provider value={userData}>
      <MyComponent />
    </UsersContext.Provider>
  );
};



/**2. UsersContext.Consumer:
Amaç: Context'in içindeki verilere erişmek.
Kullanımı:
jsx
Kodu kopyala
import UsersContext from './UsersContext';

const MyComponent = () => {
  return (
    <UsersContext.Consumer>
      {(context) => <div>{context.users.join(', ')}</div>}
    </UsersContext.Consumer>
  );
};*/