import LocalStorageWrapper from './storage';

const TOKEN = 'token';

export type token = {
  userId: string;
  role: string;
};

const tokenStorage = new LocalStorageWrapper<token>();

const get = (): token | null => {
  return tokenStorage.get(TOKEN);
};

const set = (value: token): void => {
  tokenStorage.set(TOKEN, value);
};

const remove = (): void => {
  tokenStorage.remove(TOKEN);
};

export default {
  get,
  set,
  remove,
};
