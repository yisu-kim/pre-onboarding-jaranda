import userData from 'utils/userData.json';
import LocalStorageWrapper from './storage';

const USER_DATA = 'userData';

export type UserData = {
  userId: string;
  password: string;
  name: string;
  age: number;
  role: string;
  address: string;
  menubar: { name: string; path: string }[];
  creditCard: {
    CVC: string;
    cardNumber: string;
    expired: string;
    holderName: string;
  };
};

const userDataStorage = new LocalStorageWrapper<UserData[]>();

const get = (): UserData[] | null => {
  return userDataStorage.get(USER_DATA);
};

const set = (value: UserData[]): void => {
  userDataStorage.set(USER_DATA, value);
};

const isExist = (): boolean => {
  return !!get();
};

const init = (): void => {
  const userDataList: UserData[] = userData;
  set(userDataList);
};

export default {
  get,
  set,
  isExist,
  init,
};
