import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IIngredientsState {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  ingredientDetails: TIngredient | undefined;
}

const ingredientsState: IIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  ingredientDetails: undefined
};

export const fetchIngredients = createAsyncThunk<TIngredient[], void>(
  'burgerIngredientsSlice/fetchIngredients',
  async (_, thunkObject) => {
    const response = await getIngredientsApi();
    const dispatch = thunkObject.dispatch;
    dispatch(saveIngredients(response));
    return response;
  }
);

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredientsSlice',
  initialState: ingredientsState,
  reducers: {
    saveIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
      state.buns = action.payload.filter((item) => item.type === 'bun');
      state.mains = action.payload.filter((item) => item.type === 'main');
      state.sauces = action.payload.filter((item) => item.type === 'sauce');
    },
    searchIngredientDetails: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      if (action.payload) {
        state.ingredientDetails = state.ingredients.find(
          (item) => item._id === action.payload
        );
      }
    },
    clearIngredientDetails: (state) => {
      state.ingredientDetails = undefined;
    }
  },
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    bunsSelector: (state) => state.buns,
    mainsSelector: (state) => state.mains,
    saucesSelector: (state) => state.sauces,
    ingredientDetailsSelector: (state) => state.ingredientDetails
  }
});

export default burgerIngredientsSlice.reducer;
export const {
  saveIngredients,
  searchIngredientDetails,
  clearIngredientDetails
} = burgerIngredientsSlice.actions;
export const {
  ingredientsSelector,
  bunsSelector,
  mainsSelector,
  saucesSelector,
  ingredientDetailsSelector
} = burgerIngredientsSlice.selectors;
