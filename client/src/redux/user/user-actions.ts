import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { User } from "../../types/user";
import {
  UserActionTypes,
  UserLoginErrorAction,
  UserLoginLoadingAction,
  UserLoginSuccessAction,
  UserLogoutSuccessAction,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
} from "./user-types";

const userLoginLoading = (): UserLoginLoadingAction => ({
  type: USER_LOGIN_LOADING,
});

const userLoginSuccess = (user: User): UserLoginSuccessAction => ({
  type: USER_LOGIN_SUCCESS,
  user,
});

const userLoginError = (errorMessage: string): UserLoginErrorAction => ({
  type: USER_LOGIN_ERROR,
  errorMessage
});

const userLogoutSuccess = (): UserLogoutSuccessAction => ({
  type: USER_LOGOUT_SUCCESS,
});

export const userLogin = (email: string, password: string) => {
  return async (
    dispatch: ThunkDispatch<any, any, UserActionTypes>,
    getState: any
  ) => {
    dispatch(userLoginLoading());
    try {
      const response = await axios.post("/api/session/login", {
        email,
        password,
      });
      dispatch(userLoginSuccess(response.data.user));
      localStorage.setItem("token", response.data.user.token)
    } catch (error) {
      dispatch(userLoginError("Could not sign in"))
    }
  };
};

export const UserLogout = () => {
  return async (
    dispatch: ThunkDispatch<any, any, UserActionTypes>,
    getState: any
  ) => {
    localStorage.clear()
    dispatch(userLoginLoading)
    try {
      await axios.get('/api/session/logout')
      dispatch(userLogoutSuccess())
    } catch (error) {
      dispatch(userLoginError("Error Logging Out"))
    }
  };
};

interface UserSignup {
  username: string;
  password: string;
  email: string;
  password2: string;
}

export const userSignup = (user: UserSignup) => {
  return async (
    dispatch: ThunkDispatch<any, any, UserActionTypes>,
    getState: any
  ) => {
    dispatch(userLoginLoading())
    try {
      const response = await axios.post("/api/users/signup", user);
      dispatch(userLoginSuccess(response.data.user));
      localStorage.setItem("token", response.data.user.token)
    } catch (error) {
      // display error messages
      dispatch(userLoginError("Could not sign up"))
    }
  };
};

export const userValidate = () => {
  return async (
    dispatch: ThunkDispatch<any, any, UserActionTypes>,
    getState: any
  ) => {
    try {
      const token: string | null = localStorage.getItem("token") || null
      const response = await axios.post("/api/session/current", token)
      dispatch(userLoginSuccess(response.data.user));
    } catch (error) {
      dispatch(userLoginError("error authenticating"))
    }
  };
};
