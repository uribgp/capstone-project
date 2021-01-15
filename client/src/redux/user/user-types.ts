import { User } from "../../types/user";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_LOADING = "USER_LOGIN_LOADING";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const USER_VALIDATE_SUCCESS = "USER_VALIDATE_SUCCESS";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export interface UserLoginErrorAction {
  type: typeof USER_LOGIN_ERROR,
  errorMessage: string; 
}

export interface UserValidateSuccess {
  type: typeof USER_VALIDATE_SUCCESS,
}

export interface UserLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS,
  user: User
}

export interface UserLoginAction {
  type: typeof USER_LOGIN,
  payload: string
}

export interface UserLoginLoadingAction {
  type: typeof USER_LOGIN_LOADING,
}

export interface UserLogoutSuccessAction {
  type: typeof USER_LOGOUT_SUCCESS,
}

export type UserActionTypes = UserLoginAction | UserLoginLoadingAction | UserLoginSuccessAction | UserLoginErrorAction | UserValidateSuccess | UserLogoutSuccessAction