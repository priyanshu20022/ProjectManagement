import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import { useAuth } from './AuthContext'; 

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Navigation = styled.nav`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = () => {
  const { loggedInStatus, signOut, getNameFromToken } = useAuth();
  const userName = getNameFromToken();

  return (
    <HeaderContainer>
      <h1>Swegon</h1>
      <Navigation>
        {!loggedInStatus ? (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        ) : (
          <>
            <span>Welcome, {userName}</span>
            <Button onClick={signOut}>Logout</Button>
          </>
        )}
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
