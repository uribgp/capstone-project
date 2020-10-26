import axios from 'axios';

export const sendPayment = (cost, paymentId, coachId) => {
    return async dispatch => {
      const res = axios.post('/api/payments/submit_payment', {cost, paymentId, coachId})
      
      return res;
    }
  }