import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useThemeContext } from '../ThemeContext';

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
      <Button onClick={toggleTheme} sx={tabSx}>
        {mode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </Nav>
  );
};

export default Header;

