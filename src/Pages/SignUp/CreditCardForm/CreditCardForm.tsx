import React, { useState, useEffect, ChangeEvent } from 'react';
import Toast from 'Components/Toast';
import {
  addSeparatorBetweenNumber,
  getOnlyNumber,
  limitLength,
  validateExpiration,
} from './utils/cardValidation';
import { style } from './CreditCardFormStyle';

const INPUT_NAMES = {
  CARD_NUMBER: 'cardNumber',
  HOLDER_NAME: 'holderName',
  EXPIRED: 'expired',
  CVC: 'CVC',
};

type CreditCard = {
  cardNumber: string;
  holderName: string;
  expired: string;
  CVC: string;
};

interface CreditCardFormProps {
  closeModal: () => void;
  creditCard: CreditCard;
  handleCardInput: (card: CreditCard) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  closeModal,
  creditCard,
  handleCardInput,
}) => {
  const { cardNumber, holderName, expired, CVC } = creditCard;

  const [cardInput, setCardInput] = useState({
    cardNumber: addSeparatorBetweenNumber(cardNumber, 4, ' '),
    holderName,
    expired: addSeparatorBetweenNumber(expired, 2, '/'),
    CVC,
  });

  const [toast, setToast] = useState({
    status: false,
    msg: '',
  });

  useEffect(() => {
    if (toast.status) {
      const timeInterver = setTimeout(() => {
        setToast({ ...toast, status: false });
      }, 2000);
      return () => clearTimeout(timeInterver);
    }
  }, [toast]);

  const onChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case INPUT_NAMES.CARD_NUMBER:
        setCardInput({
          ...cardInput,
          cardNumber: limitLength(
            addSeparatorBetweenNumber(e.target.value, 4, ' '),
            19,
          ),
        });
        break;

      case INPUT_NAMES.HOLDER_NAME:
        setCardInput({ ...cardInput, holderName: e.target.value });
        break;

      case INPUT_NAMES.EXPIRED:
        setCardInput({
          ...cardInput,
          expired: limitLength(
            addSeparatorBetweenNumber(e.target.value, 2, '/'),
            5,
          ),
        });
        break;

      case INPUT_NAMES.CVC:
        setCardInput({
          ...cardInput,
          CVC: limitLength(getOnlyNumber(e.target.value), 3),
        });
        break;
    }
  };

  const onClickSubmitBtn = () => {
    const { cardNumber, holderName, expired, CVC } = cardInput;

    if (cardNumber.length < 19) {
      setToast({
        ...toast,
        status: true,
        msg: '유효한 카드 번호를 입력해주세요.',
      });
      return;
    } else if (holderName.length < 1) {
      setToast({
        ...toast,
        status: true,
        msg: '이름을 입력해주세요.',
      });
      return;
    } else if (!(expired.length === 5 && validateExpiration(expired))) {
      setToast({
        ...toast,
        status: true,
        msg: '유효한 카드 유효기간을 입력해주세요.',
      });
      return;
    } else if (CVC.length < 3) {
      setToast({
        ...toast,
        status: true,
        msg: '유효한 CVC를 입력해주세요.',
      });
      return;
    }

    handleCardInput({
      cardNumber: cardNumber.replaceAll(' ', '-'),
      holderName,
      expired: expired.replace('/', ''),
      CVC,
    });
    closeModal();
  };

  return (
    <Container>
      <Wrap>
        <Row>
          <Title>신용카드 정보 입력</Title>
        </Row>
        <Row>
          <CardNumberInput
            name={INPUT_NAMES.CARD_NUMBER}
            value={cardInput.cardNumber}
            onChange={onChangeInfo}
          />
        </Row>
        <Row>
          <HolderNameInput
            name={INPUT_NAMES.HOLDER_NAME}
            value={cardInput.holderName}
            onChange={onChangeInfo}
          />
        </Row>
        <Row>
          <ExpiredInput
            name={INPUT_NAMES.EXPIRED}
            value={cardInput.expired}
            onChange={onChangeInfo}
          />
          <CVCInput
            name={INPUT_NAMES.CVC}
            value={cardInput.CVC}
            onChange={onChangeInfo}
          />
        </Row>
        <Row>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <CreditButton onClick={onClickSubmitBtn}>등록</CreditButton>
        </Row>
      </Wrap>
      <Toast show={toast.status} contents={toast.msg} />
    </Container>
  );
};

export default CreditCardForm;

const {
  Container,
  Wrap,
  Row,
  Title,
  CardNumberInput,
  HolderNameInput,
  ExpiredInput,
  CVCInput,
  CancelButton,
  CreditButton,
} = style;
