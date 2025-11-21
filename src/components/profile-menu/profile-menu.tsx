import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../services/store';
import { fetchLogoutUser } from '@slices';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(fetchLogoutUser())
      .unwrap()
      .then(() => navigate('/login'))
      .catch((err) => console.error('Ошибка выхода пользователя:', err));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
