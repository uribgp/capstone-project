import { Reducer } from 'redux';
import {UserActionTypes, USER_LOGIN_ERROR, USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS} from './user-types'

const DEFAULT_STATE: UserState = {
  username: "",
  authenticated: false, 
  id: "-1",
  avatar: "",
  loading: true,
  errorMessage: "",
}

interface UserState {
  username: string; 
  authenticated: boolean; 
  id: string;
  avatar: string, 
  loading: boolean;
  errorMessage: string;
}


export const userReducer:Reducer<UserState, UserActionTypes>  = (state = DEFAULT_STATE, action: UserActionTypes): UserState => {
  switch (action.type) {
    case USER_LOGIN_LOADING: 
    return {
      ...state,
      loading: true,
    }
    case USER_LOGIN_SUCCESS: 
    return {
      id: action.user.id,
      loading: false, 
      username: action.user.username,
      authenticated: true,
      avatar: action.user.avatar,
      errorMessage: "",
    }
    case USER_LOGIN_ERROR: 
    return {
      ...state, 
      loading: false, 
      errorMessage: action.errorMessage
    }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
};
