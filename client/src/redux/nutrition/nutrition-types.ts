import { Food } from "../../types/food";

export const FETCH_FOOD_LOADING = "FETCH_FOOD_LOADING";
export const FETCH_FOOD_ERROR = "FETCH_FOOD_ERROR";
export const FETCH_FOOD_SUCCESS = "FETCH_FOOD_SUCCESS";

export const FOOD_LOADING = "FOOD_LOADING";
export const POST_FOOD_ERROR = "POST_FOOD_ERROR";
export const ADD_FOOD = "ADD_FOOD";

export interface AddFood {
  type: typeof ADD_FOOD,
  food: Food
}

export interface FoodLoadingAction {
  type: typeof FETCH_FOOD_LOADING;
}

export interface PostFoodError {
  type: typeof POST_FOOD_ERROR,
  commentId: number;
}

export interface FoodSuccessAction {
  type: typeof FETCH_FOOD_SUCCESS;
  food: Food[];
}

export interface FoodErrorAction {
  type: typeof FETCH_FOOD_ERROR;
}

// export interface AddFood {
//     name: string; 
//     calories: number;
//     protein: number;
//     fat: number;
//     carbs: number;
//   }

export type NutritionActionTypes =
  | AddFood
  | FoodLoadingAction
  | PostFoodError
  | FoodSuccessAction
  | FoodErrorAction
  ;

