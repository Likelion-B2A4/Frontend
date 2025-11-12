// password 유효성 검사
export const isValidPassword = (password: string): boolean => {
  if (password.length < 8) {
    return false;
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasLetter && hasNumber;
};

// 이름 유효성 검사
export const isNameValid = (name: string): boolean => {
  if (name.length >= 2) {
    return true;
  } else return false;
};
