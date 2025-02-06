import { Cookies } from 'react-cookie';

export const COOKIE_NAMES = {
  GUEST_MODE: 'GUEST_MODE',
  POST_ID: 'POST_ID',
} as const;

const cookies = new Cookies();

type CookieOptions = {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

export const setCookie = (
  name: string,
  value: string | boolean,
  options?: CookieOptions,
) => {
  // boolean 값은 문자열로 변환하여 저장
  const valueToStore = typeof value === 'boolean' ? String(value) : value;
  return cookies.set(name, valueToStore, { ...options });
};

export const getCookie = (name: string) => {
  const value = cookies.get(name);
  // GUEST_MODE인 경우에만 boolean으로 변환
  if (name === COOKIE_NAMES.GUEST_MODE) {
    return value === 'true';
  }
  return value;
};
