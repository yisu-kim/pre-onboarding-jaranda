import userDataStorage, { UserData } from 'utils/storage/userData';

export default function setUserData(data: UserData): boolean {
  const userData = userDataStorage.get();
  if (userData === null) {
    userDataStorage.set([data]);
  } else {
    userData.push(data);
    userDataStorage.set(userData);
  }
  return true;
}
