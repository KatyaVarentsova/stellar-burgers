import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { fetchLoginUser } from '@slices';
import { useAppDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.error('Ошибка входа пользователя:', err));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
