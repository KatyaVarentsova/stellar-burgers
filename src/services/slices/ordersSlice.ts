import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrdersState {
  orderRequest: boolean;
  orderModalData: TNewOrderResponse | null;
  ordersList: TOrder[];
  orderDetails: TOrder | null;
}

const ordersState: IOrdersState = {
  orderRequest: false,
  orderModalData: null,
  ordersList: [],
  orderDetails: null
};

export const fetchOrders = createAsyncThunk<TOrder[], void>(
  'ordersSlice/fetchOrders',
  async (_, thunkObject) => {
    const response = await getOrdersApi();
    const dispatch = thunkObject.dispatch;
    dispatch(saveOrders(response));
    return response;
  }
);

export const fetchMakeOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'ordersSlice/fetchMakeOrder',
  async (data, thunkObject) => {
    const response = await orderBurgerApi(data);
    const dispatch = thunkObject.dispatch;
    dispatch(saveModalData(response));
    return response;
  }
);

export const fetchOrderDetails = createAsyncThunk<TOrder, number>(
  'ordersSlice/fetchOrderDetails',
  async (number, thunkObject) => {
    const response = await getOrderByNumberApi(number);
    const dispatch = thunkObject.dispatch;
    dispatch(saveOrderDetails(response.orders[0]));
    return response.orders[0];
  }
);

const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState: ordersState,
  reducers: {
    saveOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.ordersList = action.payload;
    },
    saveModalData: (state, action: PayloadAction<TNewOrderResponse>) => {
      state.orderModalData = action.payload;
    },
    clearModalData: (state) => {
      state.orderModalData = null;
    },
    saveOrderDetails: (state, action: PayloadAction<TOrder>) => {
      state.orderDetails = action.payload;
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    }
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    orderdsListSelector: (state) => state.ordersList,
    orderDetailsSelector: (state) => state.orderDetails
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMakeOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(fetchMakeOrder.fulfilled, (state) => {
      state.orderRequest = false;
    });
  }
});

export default ordersSlice.reducer;
export const {
  saveOrders,
  saveModalData,
  clearModalData,
  saveOrderDetails,
  clearOrderDetails
} = ordersSlice.actions;
export const {
  orderdsListSelector,
  orderModalDataSelector,
  orderRequestSelector,
  orderDetailsSelector
} = ordersSlice.selectors;
