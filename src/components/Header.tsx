import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useThemeContext } from '../ThemeContext';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../features/authSlice';

const Nav = styled.nav`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 1rem;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const tabSx = {
  color: 'inherit',
  margin: '0 0.5rem',
  textDecoration: 'none',
};

const Header: React.FC = () => {
  const { toggleTheme, mode } = useThemeContext();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  return (
    <Nav>
    <Button
      component={NavLink}
      to="/"
      end
      sx={{
        ...tabSx,
        '&.active': { backgroundColor: 'rgba(255,255,255,0.2)' },
      }}
    >
      Todo List
    </Button>
    <Button
      component={NavLink}
      to="/two"
      sx={{
        ...tabSx,
        '&.active': { backgroundColor: 'rgba(255,255,255,0.2)' },
      }}
    >
      Page Two
    </Button>
    <Button
      component={NavLink}
      to="/three"
      sx={{
        ...tabSx,
        '&.active': { backgroundColor: 'rgba(255,255,255,0.2)' },
      }}
    >
      Page Three
    </Button>
    {auth.token ? (
      <>
        <span style={{ margin: '0 0.5rem' }}>Hello, {auth.username}</span>
        <Button onClick={() => dispatch(logout())} sx={tabSx}>
          Logout
        </Button>
      </>
    ) : (
      <>
        <Button component={NavLink} to="/login" sx={tabSx}>
          Login
        </Button>
        <Button component={NavLink} to="/register" sx={tabSx}>
          Register
        </Button>
      </>
    )}
    <Button onClick={toggleTheme} sx={tabSx}>
      {mode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
    </Nav>
  );
};

export default Header;

