import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { SET_CLIENT_SUCCESS, SUBMIT_PAYMENT_SUCCESS } from './payments-types';
  
  export const submitPaymentSuccess = () => ({
    type: SUBMIT_PAYMENT_SUCCESS,
  });

const setClientSuccess = (clientSecret) => ({
    type: SET_CLIENT_SUCCESS,
    clientSecret
  });

export const setClient = () => {
    return async dispatch => {
        const res = await axios.post('/api/payments/set_client')
        const clientSecret = res.data['client_secret']
        dispatch(setClientSuccess(clientSecret))
    }
}

export const submitPayment = () => {
 return async dispatch => {
    //  send back paymentmethodID, coachID, cost
     const res = await axios.post('/api/payments/submit_payment')
 }
}