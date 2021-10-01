import userDataStorage, { UserData } from 'utils/storage/userData';

export const getUserInfo = (
  pages: number,
  limit: number,
  searchWord: string,
): { userData: UserData[]; maxPage: number } => {
  const originalData = userDataStorage.get();
  const filteredUserInfo: UserData[] = [];
  const nonFilteredUserInfo: UserData[] = [];
  const paginationInfo: UserData[] = [];

  originalData?.map((user) => {
    if (
      user.userId.search(searchWord) >= 0 ||
      user.name.search(searchWord) >= 0
    ) {
      filteredUserInfo.push({
        userId: user.userId,
        password: user.password,
        name: user.name,
        age: user.age,
        role: user.role,
        address: user.address,
        menubar: user.menubar,
        creditCard: {
          CVC: user.creditCard.CVC,
          cardNumber: user.creditCard.cardNumber,
          expired: user.creditCard.expired,
          holderName: user.creditCard.holderName,
        },
      });
    }
    nonFilteredUserInfo.push({
      userId: user.userId,
      password: user.password,
      name: user.name,
      age: user.age,
      role: user.role,
      address: user.address,
      menubar: user.menubar,
      creditCard: {
        CVC: user.creditCard.CVC,
        cardNumber: user.creditCard.cardNumber,
        expired: user.creditCard.expired,
        holderName: user.creditCard.holderName,
      },
    });
    return;
  });

  const data =
    filteredUserInfo.length !== 0 ? filteredUserInfo : nonFilteredUserInfo;
  const maxPage =
    Math.ceil(data.length / limit) > 0 ? Math.ceil(data.length / limit) : 1;

  data.map((user, idx) => {
    if (idx >= (pages - 1) * limit && idx < pages * limit) {
      paginationInfo.push({
        userId: user.userId,
        password: user.password,
        name: user.name,
        age: user.age,
        role: user.role,
        address: user.address,
        menubar: user.menubar,
        creditCard: {
          CVC: user.creditCard.CVC,
          cardNumber: user.creditCard.cardNumber,
          expired: user.creditCard.expired,
          holderName: user.creditCard.holderName,
        },
      });
    }
    return;
  });
  return { userData: paginationInfo, maxPage: maxPage };
};
