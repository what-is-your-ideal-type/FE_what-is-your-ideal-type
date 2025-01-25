import { Navigate } from 'react-router-dom';
import { useGuestMode } from '../../hooks/use-guest-mode';

export const LandingRoute = ({ children }: { children: React.ReactNode }) => {
  const [guestMode, setGuestMode] = useGuestMode();
  if (guestMode === false) {
    //Replace: 현재 페이지를 history stack에서 mypage로 교체
    return <Navigate to='/mypage' replace />;
  }

  if (!guestMode) {
    setGuestMode(true);
    return <Navigate to='/mypage' replace />;
  }

  return <>{children}</>;
};
