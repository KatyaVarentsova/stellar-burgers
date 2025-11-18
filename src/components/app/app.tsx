import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { ProtectedRoute } from '../protected-route';
import { useAppDispatch } from '../../services/store';
import { fetchAutoUser, fetchIngredients } from '@slices';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAutoUser());
    dispatch(fetchIngredients());
  }, []);

  const navigate = useNavigate();
  const handleModalClose = () => {
    navigate(-1);
  };
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* location={backgroundLocation || location} */}
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyAuth>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyAuth>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* {backgroundLocation && ( */}
      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингридиента' onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Информация о заказе' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute onlyAuth>
              <Modal title='Информация о заказе' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
