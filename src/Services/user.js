import userDataStorage from 'utils/storage/userData';
import tokenStorage from 'utils/storage/token';

export const getCurrentUser = () => {
  return tokenStorage.get();
};

export const getUserData = (userId) => {
  const allUserData = userDataStorage.get();
  return allUserData.find((user) => user.userId === userId);
};

export const getUserMenu = () => {
  const currentUser = getCurrentUser();
  return getUserData(currentUser.userId).menubar;
};

export const isUserMenu = (menuPath) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const userDate = getUserData(currentUser.userId);
    const finded = userDate.menubar.find((menu) => menu.path === menuPath);
    return Boolean(finded);
  }
  return false;
};
