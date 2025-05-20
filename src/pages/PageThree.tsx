import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const PageThree: React.FC = () => <Container>Page Three</Container>;

export default PageThree;
