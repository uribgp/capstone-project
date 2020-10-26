import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPayment } from '../../../store/payment/payment-actions';
import Button from '../Button/Button';
import './PaymentMethod.scss';


export default function PaymentMethod({cost, title, description, id, coachId}) {
  const dispatch = useDispatch()
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendPayment(cost, id, coachId))
  }
  console.log(id)
  console.log(coachId)
    return (
        <div className="payment_info">
          <div className="payment_amount">
            <span className='payment_amount-title'>
            Cost: ${cost}
            </span>
          </div>
          <div className="payment_title">
              {title}
          </div>
          <div className="payment_description">
              <p>{description}</p>
          </div>
          <div className="payment-button">
            <form >
                <label htmlFor='payment' id='payment-amount'>Total cost</label>
                <input min={cost} type="number" className='reward-pledge-input' name="payment" value={cost}required>
                </input>
                <div id='payment-button'>
                  <Button onClick={handleSubmit}>
                  Make Payment
                  </Button>
                </div>
            </form>
          </div>
        </div>
    )
}