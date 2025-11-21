import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  ingredientDetailsSelector,
  ingredientsSelector,
  searchIngredientDetails
} from '@slices';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const ingredientData = useAppSelector(ingredientDetailsSelector);
  const ingredients = useAppSelector(ingredientsSelector);

  useEffect(() => {
    dispatch(searchIngredientDetails(id));
  }, [ingredients, dispatch, id]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
