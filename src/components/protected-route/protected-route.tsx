import { Navigate, useLocation } from 'react-router-dom';
import { IProtectedRouteProps } from './type';
import { FC } from 'react';
import { getCookie } from '../../utils/cookie';
import { Preloader } from '@ui';
import { useAppSelector } from '../../services/store';
import { userRequestSelector } from '@slices';

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyAuth,
  children
}) => {
  const isAuth = Boolean(getCookie('accessToken'));
  const location = useLocation();
  const isLoading = useAppSelector(userRequestSelector);

  if (onlyAuth && !isAuth) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (!onlyAuth && isAuth) {
    return <Navigate to='/profile' replace />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return children;
};
