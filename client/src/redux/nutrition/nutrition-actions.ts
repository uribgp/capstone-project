import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { Food } from "../../types/food";
import { NutritionActionTypes, ADD_FOOD, AddFood, FETCH_FOOD_LOADING, FETCH_FOOD_ERROR, FoodLoadingAction, FoodSuccessAction, FETCH_FOOD_SUCCESS, FoodErrorAction } from "./nutrition-types";

const foodLoading = (): FoodLoadingAction => ({
    type: FETCH_FOOD_LOADING,
});

const foodSuccess = (
    food: Food[]
): FoodSuccessAction => ({
    type: FETCH_FOOD_SUCCESS,
    food,
});

const foodError = (): FoodErrorAction => ({
    type: FETCH_FOOD_ERROR,
});

export const addFood = (
    food: Food
): AddFood => ({
    type: ADD_FOOD,
    food,
});

export const postFood = (food: Food) => {
    return async (
        dispatch: ThunkDispatch<any, any, NutritionActionTypes>,
        getState: any
    ) => {
        dispatch(foodLoading());
        try {
            const response = await axios.post("/api/nutrition/food", food)
            dispatch(addFood(response.data.food));
        } catch (error) {
            console.log(error)
            dispatch(foodError());
        }
    };
};

export const fetchFood = () => {
    return async (
        dispatch: ThunkDispatch<any, any, NutritionActionTypes>,
        getState: any
    ) => {
        dispatch(foodLoading());
        try {
            const response = await axios.get(`/api/nutrition/food`);
            dispatch(foodSuccess(response.data.food));
        } catch (error) {
            console.log(error);
            dispatch(foodError());
        }
    };
};

// LIKELY NEEDS TO BE MOVED TO CALENDAR REDUCER LATER
export const postDate = (date: Date) => {
    return async (
        dispatch: ThunkDispatch<any, any, NutritionActionTypes>,
        getState: any
    ) => {
        try {
            const response = await axios.post("/api/nutrition/date", date)
        } catch (error) {
            console.log(error)
        };
    };
};
