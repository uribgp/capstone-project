import { Reducer } from 'redux'
import { SET_CLIENT_SUCCESS } from './payments-types';

const DEFAULT_STATE = { clientSecret: ""}

export const paymentsReducer = (state = DEFAULT_STATE, action) => {
  
    switch (action.type) {  
        case SET_CLIENT_SUCCESS:
            return {
                ...state,
                clientSecret: action.clientSecret
            }
        default:
            return state;
    }
}