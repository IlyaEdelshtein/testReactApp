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

const Tab = styled(Button)`
  color: #fff;
  margin: 0 0.5rem;
  text-decoration: none;
`;

const Header: React.FC = () => (
  <Nav>
    <Tab
      component={NavLink}
      to="/"
      end
      sx={{ '&.active': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
    >
      Todo List
    </Tab>
    <Tab
      component={NavLink}
      to="/two"
      sx={{ '&.active': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
    >
      Page Two
    </Tab>
    <Tab
      component={NavLink}
      to="/three"
      sx={{ '&.active': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
    >
      Page Three
    </Tab>
  </Nav>
);

export default Header;

