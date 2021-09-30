import React, { useEffect, useState } from 'react';
import Modal from 'Modal';
import SignUp from 'Pages/SignUp';
import searchIcon from 'Assets/search.png';
import { style } from './AdminStyle';
import { MENUS, LIMIT } from 'utils/constants';
import userDataStorage from 'utils/storage/userData';
import { getUserInfo } from 'utils/getUserInfo';
import Checkbox from 'Components/Checkbox';
import Layout from 'Components/Layout';
import { AiOutlineCheck } from 'react-icons/ai';
import userDataForm from 'utils/storage/userDataForm';

function Admin() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [checkedArray, setCheckedArray] = useState({});
  const [modalStyle, setModalStyle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pages, setPages] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [clickCheck, setClickCheck] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const checkedKeys = Object.keys(checkedArray);

  useEffect(() => {
    initSelected(userDataStorage.get());
  }, []);

  useEffect(() => {
    const userInfo = getUserInfo(pages, LIMIT, searchValue);
    setData(userInfo.userData);
    setMaxPage(userInfo.maxPage);
    setClickCheck(false);
  }, [pages, searchValue, clickCheck]);

  const onHandleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const initSelected = (userData) => {
    let obj = new Object();
    obj = userData.reduce(
      (acc, cur) => ({ ...acc, [cur.userId]: cur.menubar }),
      {},
    );
    setCheckedArray(obj);
  };

  const onClickChckBtn = (page, path, userId) => {
    const seletedInfo = checkedKeys.includes(userId);
    let obj = new Object();
    let newSelected = [];

    let innerObj = new Object();
    innerObj['name'] = page;
    innerObj['path'] = path;

    if (seletedInfo === false || checkedArray[userId].length <= 0) {
      newSelected.push(innerObj);
    } else {
      let selectedIndex = true;
      for (const key in checkedArray[userId]) {
        if (checkedArray[userId][key].name !== innerObj.name) {
          selectedIndex = false;
        } else {
          selectedIndex = true;
          break;
        }
      }

      if (selectedIndex === false) {
        newSelected = newSelected.concat(checkedArray[userId], innerObj);
      } else {
        newSelected = newSelected.concat(checkedArray[userId]);
        const rmvFindIndx = newSelected.indexOf(
          newSelected.find((elem) => elem.name === innerObj.name),
        );
        newSelected.splice(rmvFindIndx, 1);
      }
    }
    for (const [key, value] of Object.entries(checkedArray)) {
      obj[key] = value;
    }
    obj[userId] = newSelected;
    setCheckedArray(obj);
  };

  const isSelected = (name, userId) => {
    if (checkedKeys.length > 0 && checkedKeys.includes(userId.toString())) {
      for (const [key] of Object.entries(checkedArray[userId])) {
        if (checkedArray[userId][Number(key)].name === name) {
          return true;
        }
      }
    }
    return false;
  };

  const onClickSubmitBtn = () => {
    const allUserData = userDataStorage.get();
    let userArray = [];
    for (let i = 0; i < Object.keys(allUserData).length; i++) {
      let origin_userId = allUserData[i].userId;
      let menubar = checkedArray[origin_userId];

      userArray.push(
        userDataForm(
          origin_userId,
          allUserData[i].password,
          allUserData[i].name,
          allUserData[i].age,
          allUserData[i].creditCard.cardNumber,
          allUserData[i].creditCard.holderName,
          allUserData[i].creditCard.expired,
          allUserData[i].creditCard.CVC,
          allUserData[i].role,
          allUserData[i].address,
          menubar,
        ),
      );
    }
    userDataStorage.set(userArray);
    setIsSubmit(true);

    setTimeout(function () {
      setIsSubmit(false);
    }, 3000);
  };

  const onClickButtonLeft = () => {
    const page = pages - 1;
    if (page < 1) {
      setPages(1);
    } else {
      setPages(page);
    }
  };

  const onClickButtonRight = () => {
    const page = pages + 1;
    if (page > maxPage) {
      setPages(maxPage);
    } else {
      setPages(page);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setModalStyle(!modalStyle);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStyle(!modalStyle);
  };

  return (
    <Layout>
      <TableContainer>
        <TableTitleContainer>
          <TableTitleBox>
            <TableTitle>사용자 목록</TableTitle>
            <AccountAddButton onClick={() => openModal()}>
              계정 추가
            </AccountAddButton>
          </TableTitleBox>
          <SearchContainer>
            <SearchIcon src={searchIcon} alt="search-icon" />
            <Searchbox
              type="text"
              placeholder="Search Name, ID"
              onChange={onHandleSearch}
            />
            {!isSubmit && (
              <PageAuthButton onClick={onClickSubmitBtn}>
                페이지 권한 확정하기
              </PageAuthButton>
            )}

            {isSubmit && (
              <PageAuthButton disabled={true} onClick={onClickSubmitBtn}>
                <AiOutlineCheck />
                확정되었습니다.
              </PageAuthButton>
            )}
          </SearchContainer>
        </TableTitleContainer>

        <table>
          <thead>
            <tr>
              <Cell>ID</Cell>
              <Cell>Name</Cell>
              <Cell>Age</Cell>
              <Cell>Role</Cell>
              <Cell>Address</Cell>
              <Cell>Menu</Cell>
            </tr>
          </thead>
          {data &&
            data.map((data, indexs) => (
              <tbody key={indexs}>
                <tr key={indexs}>
                  <Cell>{data.userId}</Cell>
                  <Cell>{data.name}</Cell>
                  <Cell>{data.age}</Cell>
                  <Cell>{data.role}</Cell>
                  <Cell>{data.address}</Cell>
                  <Cell>
                    {MENUS.map((property, index) => {
                      let isItemSelected = isSelected(
                        property.name,
                        data.userId,
                      );

                      return (
                        <div key={index}>
                          <Checkbox
                            type="checkbox"
                            checked={isItemSelected}
                            id={index}
                            onClick={() =>
                              onClickChckBtn(
                                property.name,
                                property.path,
                                data.userId,
                              )
                            }
                          />
                          <label>{property.name}</label>
                        </div>
                      );
                    })}
                  </Cell>
                </tr>
              </tbody>
            ))}
        </table>
        <TableFooter>
          <div>
            <AiOutlineLeftStyle
              pageend={pages === 1 ? 'true' : 'false'}
              onClick={onClickButtonLeft}
            />
            <div>{pages}</div>
            <AiOutlineRightStyle
              pageend={pages === maxPage ? 'true' : 'false'}
              onClick={onClickButtonRight}
            />
          </div>
        </TableFooter>
      </TableContainer>
      <Modal
        show={showModal}
        onClickClose={() => closeModal()}
        accountStyle={modalStyle}
      >
        <SignUp accountPlus={modalStyle} />
      </Modal>
    </Layout>
  );
}

export default Admin;

const {
  Cell,
  AccountAddButton,
  Searchbox,
  SearchContainer,
  SearchIcon,
  TableContainer,
  TableTitleBox,
  TableFooter,
  TableTitle,
  TableTitleContainer,
  PageAuthButton,
  AiOutlineLeftStyle,
  AiOutlineRightStyle,
} = style;
