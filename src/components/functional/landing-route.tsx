import { Navigate } from 'react-router-dom';
import { getCookie, setCookie, COOKIE_NAMES } from '../utils/cookies';

export const LandingRoute = ({ children }: { children: React.ReactNode }) => {
  const isGuestMode = getCookie(COOKIE_NAMES.GUEST_MODE);
  if (isGuestMode === false) {
    //Replace: 현재 페이지를 history stack에서 mypage로 교체
    return <Navigate to='/mypage' replace />;
  }

  if (!isGuestMode) {
    setCookie(COOKIE_NAMES.GUEST_MODE, true);
    return <Navigate to='/mypage' replace />;
  }

  return <>{children}</>;
};
