import React from 'react';
import TodaysSchedule from './TodaysSchedule'
import Reward from './Reward';
import PaymentMethod from '../Shared/PaymentMethod/PaymentMethod';
import './CoachingModal.scss';

export default function CoachingModal({ props }) {
  // {props.todays_schedule && props.todays_schedule.map((schedule) => <TodaysSchedule props={schedule} />)}
  return (
    <>
      <div className="modal-container">
        <div className="coaching-modal">
        {/*props.user.rewards && props.user.rewards.map((reward) => (
                <Reward
                    cost={reward.cost}
                    title={reward.title}
                    description={reward.description}
                    owner_avatar={reward.owner_avatar}
                    owner_name={reward.owner_name}
                />
            ))
        }
      */}
        {props.todays_schedule &&  <TodaysSchedule props={props.todays_schedule} />}
        <div>
          {props.user.payment_methods && props.user.payment_methods.map((payment) => (
            <PaymentMethod
              title={payment.title}
              cost={payment.cost}
              description={payment.description}
              key={payment.id}
              id={payment.id}
              userId={payment.user_id}
              coachId={payment.user_id}
            />
          ))}
        </div>
        { /* <div className="modal-outline">
          <h4>Upload Next Coaching Video Here</h4>
          </div> */}
      </div>
      </div>
    </>
  )
}