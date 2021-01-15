import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RootState } from '../../redux/root-reducer';
import { fetchFood } from '../../redux/nutrition/nutrition-actions';
import CardFood from './CardFood';
import { Food } from '../../types/food';
import FoodUpload from './FoodUpload.container';
// import Container from '../Shared/Container/Container';
// import CalendarContainer from "../Shared/Calendar/Calendar.container";

export default function NutritionDashboardContainer(): ReactElement {
  const dispatch = useDispatch();
  const {
      food
  } = useSelector((state: RootState) => state.nutrition);

  useEffect(() => {
    dispatch(fetchFood())
  }, [dispatch]);

  const renderFood = () => {
    if (food) {
      return(
      food.map(
        ({name, protein, fat, calories, carbs}: Food ) => {
           return (
            <CardFood
                name={name}
                protein={protein}
                fat={fat}
                calories={calories}
                carbs={carbs}
            />
            );
        }
      ));
    }
  };

  return (
    <div >
      <div className="food-section-content">{renderFood()}</div>
      <FoodUpload />
    </div>
  );
}
