import {useSyncExternalStore} from 'react';

type GuestModeType = 'true' | 'false';

const getGuestModeLocalStorage = () => {
  return localStorage.getItem('GUEST_MODE');
};

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('storage', callback);
  };
};

export const useGuestMode = (): [
  string | null,
  (isGuestMode: GuestModeType) => void,
] => {
  const guestMode = useSyncExternalStore(subscribe, getGuestModeLocalStorage);

  const setGuestMode = (isGuestMode: GuestModeType) => {
    localStorage.setItem('GUEST_MODE', isGuestMode.toString());
    window.dispatchEvent(new Event('storage'));
  };

  return [guestMode, setGuestMode] as const;
};
