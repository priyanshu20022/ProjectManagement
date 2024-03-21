import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState(!!localStorage.getItem('token'));
  const [userPayload, setUserPayload] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const signUp = async (userObj) => {
    try {
      const response = await fetch('https://localhost:7250/api/Account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
      });
      
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  

  const login = async (loginObj) => {
    try {
      const response = await fetch('https://localhost:7250/api/Account/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginObj),
      });
      
      if (!response.ok) {
        throw new Error('Failed to authenticate user');
      }
   
    const { token } = await response.json(); 
    if (token) {
      storeToken(token); 
      console.log(token); 
    } else {
      console.error('Token not found in response');
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
  };
  

  const storeToken = (tokenValue) => {
    localStorage.setItem('token', tokenValue);
    setLoggedInStatus(true);
  };

  const isLoggedIn = () => !!localStorage.getItem('token');

  const checkLoginStatus = async () => {
    if (isLoggedIn()) {
      const tokenPayload = decodedToken();
    }
  };
  

  const signOut = () => {
    localStorage.clear();
    setLoggedInStatus(false);
  };

  const decodedToken = () => {
  };

  const getNameFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.name; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };


  const value = {
    loggedInStatus,
    getToken,
    signUp,
    login,
    storeToken,
    isLoggedIn,
    checkLoginStatus,
    signOut,
    decodedToken,
    getNameFromToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
