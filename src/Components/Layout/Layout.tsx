import React from 'react';
import Navbar from 'Components/Navbar';
import { Container, Contents } from './LayoutStyle';

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <Contents>{children}</Contents>
    </Container>
  );
};

export default Layout;
