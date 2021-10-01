import React, { useEffect, useState } from 'react';
import {
  NavbarContainer,
  NavbarInnerContainer,
  NavLink,
  NavMenu,
} from 'Components/Navbar/NavbarStyles';
import jaranda from 'Assets/jarandalogo.png';
import { PUBLIC_MENUS, ROUTES } from 'utils/constants';
import { UserData } from 'utils/storage/userData';
import { getUserMenu } from 'Services/user';
import { checkIsAdmin, checkIsLoggedIn, logout } from 'Services/auth';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userMenu, setUserMenu] = useState<UserData['menubar']>([]);

  useEffect(() => {
    setIsLoggedIn(checkIsLoggedIn());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsAdmin(checkIsAdmin());
      setUserMenu(getUserMenu() as UserData['menubar']);
    } else {
      setUserMenu(PUBLIC_MENUS);
      setIsAdmin(false);
    }
  }, [isLoggedIn]);

  const onClickLogout = () => {
    logout();
    setIsLoggedIn(checkIsLoggedIn());
  };

  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <NavLink to={isAdmin ? ROUTES.ADMIN : ROUTES.MAIN}>
          <img src={jaranda} alt="logo" />
        </NavLink>
        <NavMenu>
          {!isAdmin &&
            userMenu.map((menu) => (
              <NavLink key={menu.path} to={menu.path}>
                {menu.name}
              </NavLink>
            ))}
          {isLoggedIn && (
            <NavLink to={ROUTES.MAIN} onClick={onClickLogout}>
              로그아웃
            </NavLink>
          )}
        </NavMenu>
      </NavbarInnerContainer>
    </NavbarContainer>
  );
};

export default Navbar;
