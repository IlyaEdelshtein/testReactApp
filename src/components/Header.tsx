import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { styled as muiStyled } from '@mui/material/styles';
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

const ThemeSwitch = muiStyled(Switch)(({ theme }) => ({
  width: 50,
  height: 28,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 1,
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 26,
    height: 26,
  },
  '& .MuiSwitch-track': {
    borderRadius: 28 / 2,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
    opacity: 1,
  },
}));

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
      to="/time"
      sx={{
        ...tabSx,
        '&.active': { backgroundColor: 'rgba(255,255,255,0.2)' },
      }}
    >
      Time
    </Button>
    <Button
      component={NavLink}
      to="/ticktackgame"
      sx={{
        ...tabSx,
        '&.active': { backgroundColor: 'rgba(255,255,255,0.2)' },
      }}
    >
      Tick Tack Game
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
    <ThemeSwitch
      checked={mode === 'dark'}
      onChange={toggleTheme}
      sx={{ marginLeft: '0.5rem' }}
    />
    </Nav>
  );
};

export default Header;

