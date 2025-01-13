import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

export const LandingRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    //Replace: 현재 페이지를 history stack에서 mypage로 교체
    return <Navigate to='/mypage' replace />;
  }

  return <>{children}</>;
};
