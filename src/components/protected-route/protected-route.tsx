import { Navigate, useLocation } from 'react-router-dom';
import { IProtectedRouteProps } from './type';
import { FC } from 'react';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyAuth,
  children
}) => {
  const isAuth = Boolean(getCookie('accessToken'));

  if (onlyAuth && !isAuth) {
    return <Navigate to='/login' />;
  }

  if (!onlyAuth && isAuth) {
    return <Navigate to='/profile' />;
  }
  return children;
};
