import React from 'react';
import './Pitch.scss';
import ReactPlayer from 'react-player';
import PaymentMethod from '../Shared/PaymentMethod/PaymentMethod';


export default function Pitch({props}) {

  return (
    <>
      <div className='pitch_container'>
          <ReactPlayer
            className='pitch_container-video'
            volume={0}
            width={'70%'}
            muted={true}
            url={props.personal_video}
            controls={true}
            loop={false}
            playsinline
          />
          <div className='pitch_container-about-me'>
            {props.about_me}
          </div>
          </div>
          <div>
          {props.payment_methods && props.payment_methods.map((payment) => (
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
    </>
  )

}
