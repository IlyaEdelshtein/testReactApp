import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #282c34;
  padding: 1rem;
`;

const Tab = styled(NavLink)`
  color: #61dafb;
  margin-right: 1rem;
  text-decoration: none;

  &.active {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => (
  <Nav>
    <Tab to="/" end>
      Todo List
    </Tab>
    <Tab to="/two">
      Page Two
    </Tab>
    <Tab to="/three">
      Page Three
    </Tab>
  </Nav>
);

export default Header;

