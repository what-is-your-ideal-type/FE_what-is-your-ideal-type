import {Cookies} from 'react-cookie'

const cookies = new Cookies();


const setCookie = (guestMode: boolean): void => {
    return cookies.set('GUEST_MODE', guestMode.toString(), {
        path: '/',
        maxAge: 24 * 60 * 60, // 기간을 설정하지 않으면 브라우저를 닫을 때 자동 삭제s
    });
};

const getCookie = (name: 'GUEST_MODE'): boolean => {
    return cookies.get(name);
};

export const useGuestMode = (): [
    boolean,
    (isGuestMode: boolean) => void,
] => {
    const guestMode = getCookie('GUEST_MODE');
    const setGuestMode = (isGuestMode: boolean) => {
        setCookie(isGuestMode);
    };
    return [guestMode, setGuestMode] as const;
};
