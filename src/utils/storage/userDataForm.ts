import { UserData } from './userData';

export default function userDataForm(
  userId: string,
  password: string,
  name: string,
  age: number,
  cardNumber: string,
  holderName: string,
  expired: string,
  CVC: string,
  role: string,
  address: string,
  menubar: { name: string; path: string }[],
): UserData {
  return {
    userId,
    password,
    name,
    age,
    creditCard: {
      cardNumber,
      holderName,
      expired,
      CVC,
    },
    role,
    address,
    menubar,
  };
}
