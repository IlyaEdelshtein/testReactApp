import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const Nav = styled.nav`
  background: #282c34;
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const tabSx = {
  color: '#fff',
  margin: '0 0.5rem',
  textDecoration: 'none',
};

const Header: React.FC = () => (
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
  </Nav>
);

export default Header;

