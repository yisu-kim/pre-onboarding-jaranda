import { ROLES } from 'utils/constants';
import tokenStorage from 'utils/storage/token';
import { getCurrentUser } from './user';

export const logout = (): void => {
  tokenStorage.remove();
};

export const checkIsLoggedIn = (): boolean => {
  return Boolean(getCurrentUser());
};

export const checkIsAdmin = (): boolean => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    return currentUser.role === ROLES.ADMIN;
  }
  return false;
};
