import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MutableRefObject,
} from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { ROUTES, MENUS, ROLES } from 'utils/constants';
import userDataForm from 'utils/storage/userDataForm';
import userDataStorage, { UserData } from 'utils/storage/userData';
import setUserData from 'utils/setUserInfo';
import { Validation } from 'utils/checkValid';
import Modal from 'Modal';
import Layout from 'Components/Layout';
import Toast from 'Components/Toast';
import CreditCardForm from './CreditCardForm';
import get_address, { UserDataWithDaumAddress } from './utils/get_address';
import { style } from './SignUpStyle';
import { CreditCard } from './CreditCardForm/CreditCardForm';

interface SignUpProps {
  accountPlus?: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ accountPlus }) => {
  const history = useHistory();
  const idInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);
  const pwConfirmInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const [userPwconfirm, setUserPwConfirm] = useState('');
  const [isNumber, setIsNumber] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isLength, setIsLength] = useState(false);
  const [isEngNum, setIsEngNum] = useState(false);
  const [isLenId, setIsLenId] = useState(false);
  const [isSpecialId, setIsSpecialId] = useState(false);
  const [isOverlap, setIsOverlap] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [inputChk, setInputChk] = useState({
    userId: false,
    password: false,
    password_confirm: false,
    name: false,
    age: false,
    creditCard: {
      cardNumber: false,
    },
    zcode: false,
  });
  const [userInfo, setUserInfo] = useState<UserDataWithDaumAddress>({
    userId: '',
    password: '',
    name: '',
    age: 0,
    creditCard: {
      cardNumber: '',
      holderName: '',
      expired: '',
      CVC: '',
    },
    role: ROLES.USER,
    zcode: '',
    roadAddr: '',
    jibunAddr: '',
    detailAddr: '',
    menubar: MENUS,
  });
  const [toast, setToast] = useState({
    status: false,
    msg: '',
  });

  const { checkIdSignUp, checkPasswordSignUp } = Validation;

  useEffect(() => {
    if (toast.status) {
      const timeInterver = setTimeout(() => {
        setToast((prevToast) => ({ ...prevToast, status: false }));
      }, 2000);
      return () => clearTimeout(timeInterver);
    }
  }, [toast]);

  useEffect(() => {
    if (userInfo.zcode) {
      setInputChk((prevInputChk) => ({
        ...prevInputChk,
        zcode: true,
      }));
      setToast((prevToast) => ({
        ...prevToast,
        status: true,
        msg: '주소가 등록되었습니다.',
      }));
    }
  }, [userInfo.zcode]);

  useEffect(() => {
    if (userInfo.creditCard.cardNumber) {
      setInputChk((prevInputChk) => ({
        ...prevInputChk,
        creditCard: {
          cardNumber: true,
        },
      }));
      setToast((prevToast) => ({
        ...prevToast,
        status: true,
        msg: '카드가 등록되었습니다.',
      }));
    }
  }, [userInfo.creditCard.cardNumber]);

  const inputCheck = (limit: number) => {
    const { userId, password, password_confirm, name, age, zcode, creditCard } =
      inputChk;
    const { cardNumber } = creditCard;
    let result = true;
    for (let i = 0; i < limit; i++) {
      if (i === 0 && !userId) {
        setToast({
          ...toast,
          status: true,
          msg: '중복 확인 버튼을 눌러주세요.',
        });
        result = false;
      } else if (i === 1 && !password) {
        setToast({
          ...toast,
          status: true,
          msg: '비밀번호를 다시 입력해주세요.',
        });
        result = false;
      } else if (i === 2 && !password_confirm) {
        setToast({
          ...toast,
          status: true,
          msg: '비밀번호 확인을 해주세요.',
        });
        result = false;
      } else if (i === 3 && !name) {
        setToast({
          ...toast,
          status: true,
          msg: '이름을 입력해주세요.',
        });
        result = false;
      } else if (i === 4 && !age) {
        setToast({
          ...toast,
          status: true,
          msg: '나이를 입력해주세요.',
        });
        result = false;
      } else if (i === 5 && !zcode) {
        setToast({
          ...toast,
          status: true,
          msg: '주소를 입력해주세요',
        });
        result = false;
      } else if (i === 6 && !cardNumber) {
        setToast({
          ...toast,
          status: true,
          msg: '카드를 등록해주세요.',
        });
        result = false;
      }
      if (!result) break;
    }
    return result;
  };

  const onChangeID = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    const regex1 = /[A-Za-z0-9]+/g;
    const regex2 = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+/gi;
    const regex3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;
    if (regex1.test(id)) {
      setIsEngNum(true);
    } else {
      setIsEngNum(false);
    }

    if (regex3.test(id)) {
      setIsEngNum(false);
    } else {
      setIsEngNum(true);
    }

    if (regex2.test(id)) {
      setIsSpecialId(true);
    } else {
      setIsSpecialId(false);
    }

    if (id.length >= 4) {
      setIsLenId(true);
    } else {
      setIsLenId(false);
    }

    setUserInfo({
      ...userInfo,
      userId: e.target.value,
    });
  };

  const onClickIdValid = () => {
    const checkValidId = checkIdSignUp(userInfo.userId);
    const userData = userDataStorage.get() as UserData[];

    const reduplication = userData.find(
      (data) => data.userId === userInfo.userId,
    );
    if (checkValidId && reduplication === undefined) {
      setToast({ ...toast, status: true, msg: '사용가능한 아이디입니다.' });

      setInputChk({
        ...inputChk,
        userId: true,
      });
      setIsOverlap(userInfo.userId);
      return;
    } else if (!checkValidId) {
      setToast({
        ...toast,
        status: true,
        msg: '4자리 이상, 숫자 혹은 영문자만 사용해주시기 바랍니다.',
      });
      setInputChk({
        ...inputChk,
        userId: false,
      });
      return;
    } else {
      setToast({ ...toast, status: true, msg: '중복된 아이디입니다.' });
      setInputChk({
        ...inputChk,
        userId: false,
      });
    }
  };

  const onChangePW = (e: ChangeEvent<HTMLInputElement>) => {
    inputCheck(1);

    const pw = e.target.value;
    const regex1 = /[A-Za-z]+/;
    const regex2 = /[0-9]+/;
    const regex3 = /[!@#$%^*+=-]+/;

    if (regex1.test(pw)) {
      setIsEnglish(true);
    } else {
      setIsEnglish(false);
    }
    if (regex2.test(pw)) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
    if (regex3.test(pw)) {
      setIsSpecial(true);
    } else {
      setIsSpecial(false);
    }
    if (pw.length >= 8) {
      setIsLength(true);
    } else {
      setIsLength(false);
    }

    setUserInfo({
      ...userInfo,
      password: e.target.value,
    });

    HandleValidatePW(e.target.value);
  };

  const HandleValidatePW = (value: string) => {
    const checkValidPw = checkPasswordSignUp(value);

    if (checkValidPw) {
      setInputChk({
        ...inputChk,
        password: true,
      });
    } else if (!checkValidPw) {
      setInputChk({
        ...inputChk,
        password: false,
      });
    }
  };

  const onChangePwConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    inputCheck(2);
    setUserPwConfirm(e.target.value);
    MatchPW(e.target.value);
  };

  const MatchPW = (value: string) => {
    if (value !== userInfo.password) {
      setToast({
        ...toast,
        status: true,
        msg: '비밀번호가 일치하지 않습니다.',
      });

      setInputChk({
        ...inputChk,
        password_confirm: false,
      });
    } else if (value === userInfo.password) {
      setToast({
        ...toast,
        status: true,
        msg: '비밀번호가 일치합니다.',
      });

      setInputChk({
        ...inputChk,
        password_confirm: true,
      });
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    inputCheck(3);
    setUserInfo({
      ...userInfo,
      name: e.target.value,
    });
    if (e.target.value === '') {
      setInputChk({
        ...inputChk,
        name: false,
      });
    } else {
      setInputChk({
        ...inputChk,
        name: true,
      });
    }
  };

  const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    inputCheck(4);
    setUserInfo({
      ...userInfo,
      age: parseInt(e.target.value),
    });

    if (e.target.value === '' || !userInfo) {
      setInputChk({
        ...inputChk,
        age: false,
      });
    } else if (e.target.value !== '') {
      setInputChk({
        ...inputChk,
        age: true,
      });
    }
  };

  const onClickAddrBtn = () => {
    get_address(userInfo, setUserInfo);
  };

  const onChangeDetailAddr = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, detailAddr: e.target.value });
    inputCheck(5);
  };

  const onChangeRoleAdmin = (e: ChangeEvent<HTMLInputElement>) => {
    const isAdmin = e.target.checked;

    isAdmin
      ? setUserInfo({
          ...userInfo,
          role: e.target.name,
        })
      : setUserInfo({
          ...userInfo,
          role: ROLES.USER,
        });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCardInput = (cardInput: CreditCard) => {
    setUserInfo({
      ...userInfo,
      creditCard: {
        ...userInfo.creditCard,
        cardNumber: cardInput.cardNumber,
        holderName: cardInput.holderName,
        expired: cardInput.expired,
        CVC: cardInput.CVC,
      },
    });
  };

  const signupBtnEvnt = () => {
    const { userId, password, name, age, role, menubar } = userInfo;
    const { cardNumber, holderName, expired, CVC } = userInfo.creditCard;
    const userAddr =
      userInfo.zcode + ' ' + userInfo.roadAddr + ' ' + userInfo.detailAddr;

    const check = inputCheck(7);

    if (inputChk.userId && isOverlap !== userId) {
      setInputChk({
        ...inputChk,
        userId: false,
      });
      setToast({ ...toast, status: true, msg: '아이디를 다시 입력해주세요!' });
      return;
    }

    if (check) {
      setToast({ ...toast, status: true, msg: '회원 가입이 완료되었습니다!' });
      inputData(
        userId,
        password,
        name,
        age,
        cardNumber,
        holderName,
        expired,
        CVC,
        role,
        userAddr,
        menubar,
      );
      setTimeout(() => {
        history.push(ROUTES.SIGN_IN);
      }, 1500);
    } else {
      const { userId, password, password_confirm, name, age } = inputChk;

      if (!userId) {
        (idInput as MutableRefObject<HTMLInputElement>).current.focus();
      } else if (!password) {
        (pwInput as MutableRefObject<HTMLInputElement>).current.focus();
      } else if (!password_confirm) {
        (pwConfirmInput as MutableRefObject<HTMLInputElement>).current.focus();
      } else if (!name) {
        (nameInput as MutableRefObject<HTMLInputElement>).current.focus();
      } else if (!age) {
        (ageInput as MutableRefObject<HTMLInputElement>).current.focus();
      }
    }
  };

  const inputData = (
    userId: string,
    pw: string,
    name: string,
    age: number,
    cardNumber: string,
    holderName: string,
    expired: string,
    cvc: string,
    role: string,
    addr: string,
    menubar: { name: string; path: string }[],
  ) => {
    const data = userDataForm(
      userId,
      pw,
      name,
      age,
      cardNumber,
      holderName,
      expired,
      cvc,
      role,
      addr,
      menubar,
    );
    return setUserData(data);
  };

  return (
    <Layout>
      <Container>
        <Wrap>
          {!accountPlus ? (
            <Title>환상적인 회원가입을 경험해보세요.</Title>
          ) : (
            <>
              <Title>간편하게 계정 추가 해보세요.</Title>
              <Wrapper_CheckBox>
                <label htmlFor="radio">
                  <Input_Radio
                    type="checkbox"
                    name="admin"
                    onChange={(e) => onChangeRoleAdmin(e)}
                  />
                  <span>Admin</span>
                </label>
              </Wrapper_CheckBox>
            </>
          )}

          <Wrapper_ID>
            <Input_ID onChange={onChangeID} ref={idInput} />
            <Submit_ID_btn onClick={onClickIdValid}>
              아이디 중복 확인
            </Submit_ID_btn>
          </Wrapper_ID>
          <PW_policy_container>
            <PW_poclicy_item>
              <span>
                <FiCheck size="1rem" color={isLenId ? 'blue' : 'red'} /> 4자리
                이상
              </span>
            </PW_poclicy_item>
            <PW_poclicy_item>
              <span>
                <FiCheck size="1rem" color={isEngNum ? 'blue' : 'red'} /> 숫자
                혹은 영문자
              </span>
            </PW_poclicy_item>
            <PW_poclicy_item>
              <span>
                <FiCheck size="1rem" color={isSpecialId ? 'red' : 'blue'} />{' '}
                특수문자 X
              </span>
            </PW_poclicy_item>
          </PW_policy_container>
          <Input_PW
            onChange={onChangePW}
            value={userInfo.password}
            ref={pwInput}
          />

          <PW_policy_container>
            <PW_poclicy_item>
              <span>
                <FiCheck size="1rem" color={isNumber ? 'blue' : 'red'} /> 숫자
              </span>
            </PW_poclicy_item>
            <PW_poclicy_item>
              <span>
                <FiCheck size="1rem" color={isSpecial ? 'blue' : 'red'} />{' '}
                특수문자
              </span>
            </PW_poclicy_item>
            <PW_poclicy_item>
              <span>
                <FiCheck size="1rem" color={isEnglish ? 'blue' : 'red'} /> 영문
              </span>
            </PW_poclicy_item>
            <PW_poclicy_item>
              <span>
                <FiCheck size="1rem" color={isLength ? 'blue' : 'red'} /> 8자리
                이상
              </span>
            </PW_poclicy_item>
          </PW_policy_container>

          <Input_PW_confirm
            onChange={onChangePwConfirm}
            value={userPwconfirm}
            ref={pwConfirmInput}
          />
          <Input_name
            onChange={onChangeName}
            value={userInfo.name}
            ref={nameInput}
          />
          <Input_age
            onChange={onChangeAge}
            value={userInfo.age}
            ref={ageInput}
          />

          <Address_container>
            <Address_title>주소</Address_title>
            <Wrapper_ZipCode>
              <ZipCode value={userInfo.zcode} readOnly />
              <Button_ZipCode_find onClick={onClickAddrBtn}>
                우편번호 찾기
              </Button_ZipCode_find>
            </Wrapper_ZipCode>

            <Wrapper_addr>
              <Street_addr value={userInfo.roadAddr} readOnly />
              <Lot_addr value={userInfo.jibunAddr} readOnly />
            </Wrapper_addr>

            <Wrapper_addr>
              <Detailed_addr
                value={userInfo.detailAddr}
                onChange={onChangeDetailAddr}
              />
            </Wrapper_addr>
          </Address_container>
          <Button_credit onClick={openModal}>신용카드 등록</Button_credit>
          <Submit_SignUp_btn onClick={signupBtnEvnt}>
            {!accountPlus ? '가입하기' : '계정 추가 하기'}
          </Submit_SignUp_btn>
        </Wrap>
      </Container>
      <Modal show={showModal} onClickClose={closeModal}>
        <CreditCardForm
          closeModal={closeModal}
          creditCard={userInfo.creditCard}
          handleCardInput={handleCardInput}
        />
      </Modal>

      <Toast show={toast.status} contents={toast.msg} />
    </Layout>
  );
};

export default SignUp;

const {
  Container,
  Wrap,
  Title,
  Wrapper_CheckBox,
  Wrapper_ID,
  Input_ID,
  Submit_ID_btn,
  Input_PW,
  PW_policy_container,
  PW_poclicy_item,
  Input_PW_confirm,
  Submit_SignUp_btn,
  Input_name,
  Input_age,
  Button_credit,
  Address_container,
  Wrapper_ZipCode,
  ZipCode,
  Address_title,
  Button_ZipCode_find,
  Wrapper_addr,
  Street_addr,
  Lot_addr,
  Detailed_addr,
  Input_Radio,
} = style;
