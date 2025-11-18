import { Navigate, useLocation } from 'react-router-dom';
import { IProtectedRouteProps } from './type';
import { FC } from 'react';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyAuth,
  children
}) => {
  const isAuth = Boolean(getCookie('accessToken'));
  const location = useLocation();

  if (onlyAuth && !isAuth) {
    return <Navigate to='/login' replace state={{ from: location.pathname }} />;
  }

  if (!onlyAuth && isAuth) {
    return <Navigate to='/profile' replace />;
  }
  return children;
};
