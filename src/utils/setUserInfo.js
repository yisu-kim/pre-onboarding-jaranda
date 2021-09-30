import userDataStorage from 'utils/storage/userData';

export default function setUserData(data) {
  if (userDataStorage.get() === null) {
    userDataStorage.set([data]);
  } else {
    const userInfos = userDataStorage.get();
    userInfos.push(data);
    userDataStorage.set(userInfos);
  }
  return true;
}
