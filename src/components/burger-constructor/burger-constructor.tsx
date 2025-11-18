import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  bunConstructorSelector,
  clearConstructor,
  clearModalData,
  fetchMakeOrder,
  ingredientsConstructorSelector,
  orderModalDataSelector,
  orderRequestSelector
} from '@slices';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const constructorItems = {
    bun: useAppSelector(bunConstructorSelector),
    ingredients: useAppSelector(ingredientsConstructorSelector)
  };

  const orderRequest = useAppSelector(orderRequestSelector);

  const orderModalData = useAppSelector(orderModalDataSelector);

  const onOrderClick = () => {
    if (!getCookie('accessToken')) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const ingredients: TIngredient[] = [
      ...constructorItems.ingredients,
      constructorItems.bun
    ];

    const ingredientsID: string[] = ingredients.map(
      (item: TIngredient) => item._id
    );
    dispatch(fetchMakeOrder(ingredientsID)).then(() =>
      dispatch(clearConstructor())
    );
  };
  const closeOrderModal = () => {
    dispatch(clearModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData?.order ?? null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
