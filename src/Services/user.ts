import userDataStorage, { UserData } from 'utils/storage/userData';
import tokenStorage, { token } from 'utils/storage/token';

export const getCurrentUser = (): token | null => {
  return tokenStorage.get();
};

export const getUserData = (userId: string): UserData | undefined => {
  const allUserData = userDataStorage.get();
  if (allUserData) {
    return allUserData.find((user) => user.userId === userId);
  }
};

export const getUserMenu = (): UserData['menubar'] | undefined => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    return (getUserData(currentUser.userId) as UserData).menubar;
  }
};

export const isUserMenu = (menuPath: string): boolean => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const userDate = getUserData(currentUser.userId) as UserData;
    const finded = userDate.menubar.find((menu) => menu.path === menuPath);
    return Boolean(finded);
  }
  return false;
};
