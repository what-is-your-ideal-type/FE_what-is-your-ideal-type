export const validateEmail = (value: string): string => {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  return emailRegEx.test(value) ? '' : '이메일 형식을 확인해주세요.';
};

export const validatePassword = (value: string): string => {
  const passwordRegEx = /^[A-Za-z0-9]{6,}$/;
  return passwordRegEx.test(value)
    ? ''
    : '비밀번호는 영문, 숫자를 혼합하여 6자 이상 입력해주세요.';
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string => {
  return password === confirmPassword ? '' : '비밀번호가 일치하지 않습니다.';
};
