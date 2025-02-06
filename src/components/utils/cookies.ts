import { Cookies } from 'react-cookie';

export const COOKIE_NAMES = {
  GUEST_MODE: 'GUEST_MODE',
  POST_ID: 'POST_ID',
} as const;

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

// URL에서 postId를 추출하는 함수
export const extractPostIdFromUrl = (): string => {
  const pathSegments = window.location.pathname.split('/');
  return pathSegments[pathSegments.length - 1];
};
