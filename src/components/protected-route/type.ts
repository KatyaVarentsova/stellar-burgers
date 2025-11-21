import { ReactElement } from 'react';

export interface IProtectedRouteProps {
  onlyAuth?: boolean;
  children: ReactElement;
}
