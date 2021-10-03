import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Validation } from 'utils/checkValid';
import { ROUTES } from 'utils/constants';
import userDataStorage from 'utils/storage/userData';
import tokenStorage from 'utils/storage/token';
import { style } from './SignInStyle';
import Layout from 'Components/Layout';

const SignIn: React.FC = () => {
  const [isValid, setIsValid] = useState(false);
  const [inputIdValue, setInputIdValue] = useState('');
  const [inputPwValue, setInputPwValue] = useState('');
  const history = useHistory();
  const inputPw = useRef<HTMLInputElement>(null);
  const { checkId, checkPassword } = Validation;

  const onChangePwInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIdValue(e.target.value);
  };

  const onChangeIdInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPwValue(e.target.value);
  };

  const sendLogin = (userID: string, userPW: string) => {
    const userInfo = userDataStorage.get();
    const test =
      userInfo &&
      userInfo?.find(
        (data) => data.userId === userID && data.password === userPW,
      );

    if (test !== undefined && test !== null) {
      tokenStorage.set({
        userId: test.userId,
        role: test.role,
      });

      return true;
    }
    return false;
  };

  const onClickCheckLogin = () => {
    if (
      checkId(inputIdValue) &&
      checkPassword(inputPwValue) &&
      inputIdValue !== '' &&
      inputPwValue !== ''
    ) {
      const validLogin = sendLogin(inputIdValue, inputPwValue);
      const tokenRole = tokenStorage.get()?.role;
      if (validLogin && tokenRole === 'admin') {
        history.push(ROUTES.ADMIN);
      } else if (validLogin && tokenRole !== 'admin') {
        history.push(ROUTES.MAIN);
      }
      return;
    }
    setIsValid(true);
    setTimeout(() => {
      setIsValid(false);
    }, 6000);
  };

  const onKeyPressEnterkey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      target.placeholder === '아이디'
        ? (inputPw as MutableRefObject<HTMLInputElement>).current.focus()
        : onClickCheckLogin();
    }
  };

  return (
    <Layout>
      <Container>
        <Wrap>
          <Title>로그인</Title>
          {isValid && (
            <VaildMessage>
              유효한 아이디 또는 비밀번호를 입력해주세요
            </VaildMessage>
          )}
          <IdInput
            onChange={(e) => onChangePwInput(e)}
            onKeyPress={onKeyPressEnterkey}
          />
          <PasswordInput
            ref={inputPw}
            onChange={(e) => onChangeIdInput(e)}
            onKeyPress={onKeyPressEnterkey}
          />
          <LoginButton onClick={onClickCheckLogin}>로그인</LoginButton>
          <Bar />
          <SignButton to={ROUTES.SIGN_UP}>회원가입</SignButton>
        </Wrap>
      </Container>
    </Layout>
  );
};

export default SignIn;

const {
  Container,
  Wrap,
  Title,
  VaildMessage,
  IdInput,
  PasswordInput,
  LoginButton,
  Bar,
  SignButton,
} = style;

SignIn.propTypes = {
  handleLogin: PropTypes.func,
};
