import { Cookies } from 'react-cookie';

export const COOKIE_NAMES = {
  GUEST_MODE: 'GUEST_MODE',
  POST_ID: 'POST_ID',
} as const;

const cookies = new Cookies();

// 기본 쿠키 옵션 정의
const DEFAULT_OPTIONS = {
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7일
  secure: true,
  sameSite: 'strict',
} as const;

type CookieOptions = {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

// 쿠키 저장 함수
export const setCookie = (
  name: string,
  value: string | boolean,
  options?: CookieOptions,
) => {
  const valueToStore = typeof value === 'boolean' ? String(value) : value;
  return cookies.set(name, valueToStore, { ...DEFAULT_OPTIONS, ...options });
};

// 쿠키 호출 함수
export const getCookie = (name: string) => {
  const value = cookies.get(name);
  if (name === COOKIE_NAMES.GUEST_MODE) {
    if (value === 'false') {
      return false;
    }
    return true;
  }

  return value;
};

// 쿠키 제거 함수
export const removeCookie = (name: string, options?: CookieOptions) => {
  return cookies.remove(name, { ...options });
};
