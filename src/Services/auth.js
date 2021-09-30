import { ROLES } from 'utils/constants';
import tokenStorage from 'utils/storage/token';
import { getCurrentUser } from './user';

export const logout = () => {
  tokenStorage.remove();
};

export const checkIsLoggedIn = () => {
  return Boolean(getCurrentUser());
};

export const checkIsAdmin = () => {
  const currentUser = getCurrentUser();
  return currentUser.role === ROLES.ADMIN;
};
