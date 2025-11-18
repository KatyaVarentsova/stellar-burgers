import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface IUserState {
  // isAuth: boolean;
}

const userState: TUser = {
  // isAuth: false
  name: '',
  email: ''
};

export const fetchRegistrationUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData
>('userSlice/fetchRegistrationUser', async (data, thunkObject) => {
  const response = await registerUserApi(data);
  setCookie('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  const dispatch = thunkObject.dispatch;
  dispatch(saveUser(response.user));
  return response;
});

export const fetchLoginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'userSlice/fetchLoginUser',
  async (data, thunkObject) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    const dispatch = thunkObject.dispatch;
    dispatch(saveUser(response.user));
    return response;
  }
);

export const fetchAutoUser = createAsyncThunk<TUserResponse, void>(
  'userSlice/fetchAutoUser',
  async (_, thunkObject) => {
    const response = await getUserApi();
    const dispatch = thunkObject.dispatch;
    dispatch(saveUser(response.user));
    return response;
  }
);

export const fetchUpdateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'userSlice/fetchUpdateUser',
  async (user, thunkObject) => {
    const response = await updateUserApi(user);
    const dispatch = thunkObject.dispatch;
    dispatch(saveUser(response.user));
    return response;
  }
);

export const fetchLogoutUser = createAsyncThunk(
  'userSlice/fetchLogoutUser',
  async (_, thunkObject) => {
    const response = await logoutApi();
    const dispatch = thunkObject.dispatch;
    dispatch(clearUser());
    return response;
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userState,
  reducers: {
    saveUser: (state, action: PayloadAction<TUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  selectors: {
    nameSelector: (state) => state.name,
    emailSelector: (state) => state.email
  }
});

export default userSlice.reducer;
export const { saveUser, clearUser } = userSlice.actions;
export const { nameSelector, emailSelector } = userSlice.selectors;
