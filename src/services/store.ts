import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsSlice from './slices/burgerIngredientsSlice';
import feedsSlice from './slices/feedsSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import userSlice from './slices/userSlice';
import ordersSlice from './slices/ordersSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = {
  burgerIngredientsSlice: burgerIngredientsSlice,
  feedsSlice: feedsSlice,
  burgerConstructorSlice: burgerConstructorSlice,
  userSlice: userSlice,
  ordersSlice: ordersSlice
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
