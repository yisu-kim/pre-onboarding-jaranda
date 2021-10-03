export const addSeparatorBetweenNumber = (
  str: string,
  sliceNumber: number,
  separator: string,
): string => {
  let result = '';
  let startIndex = 0;
  let endIndex = sliceNumber;
  const onlyNumber = getOnlyNumber(str);

  let count = 0;
  const condition = onlyNumber.length / sliceNumber;
  for (let i = count; i <= condition; i++) {
    result += onlyNumber.slice(startIndex, endIndex) + separator;
    startIndex += sliceNumber;
    endIndex += sliceNumber;
    count = i;
  }
  const separatorRegex = new RegExp(`${separator}*$`);
  return result.replace(separatorRegex, '');
};

export const getOnlyNumber = (target: string): string => {
  const numberRegex = new RegExp(/\d*/g);
  const onlyNumber = target.match(numberRegex);
  return onlyNumber ? onlyNumber.join('') : '';
};

export const limitLength = (target: string, limitNumber: number): string => {
  return String(target).slice(0, limitNumber);
};

export const validateExpiration = (expired: string): boolean => {
  const expirationRegex = new RegExp(/(0[1-9]|1[012])[/]\d\d/);
  const thisYear = new Date().getFullYear().toString().slice(2);
  if (expirationRegex.test(expired)) {
    return expired.slice(3) >= thisYear ? true : false;
  }
  return false;
};
