import { Reducer } from 'redux';
import { Food } from '../../types/food';
import { ADD_FOOD, FETCH_FOOD_LOADING, FETCH_FOOD_ERROR, FETCH_FOOD_SUCCESS } from "./nutrition-types";

interface FoodState {
    food: Food[];
    status: "loading" | "error" | "success";
}

const DEFAULT_STATE: FoodState = {
    food: [],
    status: "loading",
};


export const nutritionReducer: Reducer<FoodState> = (state = DEFAULT_STATE, action): FoodState => {
    switch (action.type) {
        case FETCH_FOOD_LOADING:
            return {
                ...state,
                status: "loading",
            };
        case FETCH_FOOD_ERROR:
            return {
                ...state,
                status: "error",
            };
        case FETCH_FOOD_SUCCESS:
            return {
                ...state,
                food: [...action.food],
                status: "success",
            };
            case ADD_FOOD:
                return {
                  ...state,
                  food: [...state.food, action.food]
                }
        default:
            return state;
    }
}
