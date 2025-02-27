import { Navigate } from 'react-router-dom';
import { getGuestMode, setGuestMode } from '../utils/session-storage';

export const LandingRoute = ({ children }: { children: React.ReactNode }) => {
  const isGuestMode = getGuestMode();
  // 쿠키가 없는 경우 (초기 접속)
  if (isGuestMode === null || isGuestMode === undefined) {
    setGuestMode(true);
    return children;
  }
  
  // 게스트 모드가 명시적으로 'false'인 경우 마이페이지로 리다이렉트
  if (isGuestMode === false) {
    return <Navigate to='/mypage' replace />;
  }

  // 게스트 모드가 true인 경우 랜딩 페이지 표시
  return children;
};
