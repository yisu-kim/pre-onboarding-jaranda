import { UserData } from 'utils/storage/userData';

declare global {
  interface Window {
    daum: any;
  }
}

export type UserDataWithDaumAddress = Omit<UserData, 'address'> & {
  zcode: string;
  roadAddr: string;
  jibunAddr: string;
  detailAddr: string;
};

export default function get_address(
  info: UserDataWithDaumAddress,
  setInfo: React.Dispatch<React.SetStateAction<UserDataWithDaumAddress>>,
): void {
  new window.daum.Postcode({
    oncomplete: function (data: {
      zonecode: string;
      roadAddress: string;
      jibunAddress: string;
    }) {
      const zcode_ = data.zonecode;
      const roadAddr_ = data.roadAddress;
      const jibunAddr_ = data.jibunAddress;
      setInfo({
        ...info,
        roadAddr: roadAddr_,
        zcode: zcode_,
        jibunAddr: jibunAddr_,
      });
    },
  }).open();
}
