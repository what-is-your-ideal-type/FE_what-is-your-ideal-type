import { Navigate } from 'react-router-dom';
import { getCookie, setCookie, COOKIE_NAMES } from '../utils/cookies';

export const LandingRoute = ({ children }: { children: React.ReactNode }) => {
  const isGuestMode = getCookie(COOKIE_NAMES.GUEST_MODE);

  // 게스트 모드가 명시적으로 false일 때만 /mypage로 이동
  if (isGuestMode === false) {
    return <Navigate to='/mypage' replace />;
  }

  // 쿠키가 없는 경우는 children 렌더링 (즉, '/' 경로 표시)
  return <>{children}</>;
};
