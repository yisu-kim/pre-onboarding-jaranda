import React from 'react';
import ReactDom from 'react-dom';
import { style } from './ModalStyle';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  show: boolean;
  onClickClose: () => void;
  children: JSX.Element;
  accountStyle: boolean;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClickClose,
  children,
  accountStyle,
}) => {
  return ReactDom.createPortal(
    <>
      {show && (
        <>
          <Overlay>
            <Container>
              <Wrap accountStyle={accountStyle}>
                <Header>
                  <ModalClose onClick={onClickClose}>
                    <AiOutlineClose size={18} />
                  </ModalClose>
                </Header>
                <Contents>{children}</Contents>
              </Wrap>
            </Container>
          </Overlay>
        </>
      )}
    </>,
    document.getElementById('modal-root') as HTMLDivElement,
  );
};

export default Modal;

const { Overlay, Container, Wrap, Header, ModalClose, Contents } = style;
