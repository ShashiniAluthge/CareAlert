import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (name, password) => {
    const user = users.find(user => user.name === name && user.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signUp = (name, email, password) => {
    const newUser = { name, email, password };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ users, currentUser, login, signUp, logout }}>
      {children}
    </UserContext.Provider>
  );
};
