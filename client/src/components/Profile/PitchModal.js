import React from 'react';
import './Pitch.scss';
import ReactPlayer from 'react-player';


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
            <div style={{fontSize: 40, }}>About me</div>
            {props.about_me}
          </div>
          </div>
    </>
  )

}
