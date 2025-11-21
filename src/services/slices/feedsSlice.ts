import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IFeedsState {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const feedsState: IFeedsState = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk<IFeedsState, void>(
  'feedsSlice/fetchFeeds',
  async (_, thunkObject) => {
    const response = await getFeedsApi();
    const dispatch = thunkObject.dispatch;
    dispatch(saveFeeds(response));
    return response;
  }
);

const feedsSlice = createSlice({
  name: 'feedsSlice',
  initialState: feedsState,
  reducers: {
    saveFeeds: (state, action: PayloadAction<IFeedsState>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  selectors: {
    feedsListSelector: (state) => state.orders,
    feedsTotalSelector: (state) => state.total,
    feedsTotalTodaySelector: (state) => state.totalToday
  }
});

export default feedsSlice.reducer;
export const { saveFeeds } = feedsSlice.actions;
export const {
  feedsListSelector,
  feedsTotalSelector,
  feedsTotalTodaySelector
} = feedsSlice.selectors;
