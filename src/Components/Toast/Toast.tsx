import React from 'react';
import { createPortal } from 'react-dom';
import { style } from './ToastStyle';

interface ToastProps {
  show: boolean;
  contents: string;
}

const Toast: React.FC<ToastProps> = ({ show, contents }) => {
  return createPortal(
    <>
      {show && (
        <Container>
          <Wrap>
            <Header>
              <Contents>{contents}</Contents>
            </Header>
          </Wrap>
        </Container>
      )}
    </>,
    document.getElementById('toast-root') as HTMLDivElement,
  );
};

export default Toast;

const { Container, Wrap, Header, Contents } = style;
