import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const constructorState: IConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState: constructorState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= state.ingredients.length) return;
      const item = state.ingredients[index];
      state.ingredients.splice(index, 1);
      state.ingredients.splice(index + 1, 0, item);
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0) return;
      const item = state.ingredients[index];
      state.ingredients.splice(index, 1);
      state.ingredients.splice(index - 1, 0, item);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    bunConstructorSelector: (state) => state.bun,
    ingredientsConstructorSelector: (state) => state.ingredients
  }
});

export default burgerConstructorSlice.reducer;
export const {
  addIngredient,
  deleteIngredient,
  downIngredient,
  upIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
export const { bunConstructorSelector, ingredientsConstructorSelector } =
  burgerConstructorSlice.selectors;
