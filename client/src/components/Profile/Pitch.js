import React from 'react';
import './Pitch.scss';
import ReactPlayer from 'react-player';


export default function Pitch({personal_video, about_me}) {

  return (
    <>
      <div className='pitch_container'>
          <ReactPlayer
            className='pitch_container-video'
            volume={0}
            width={'70%'}
            muted={true}
            url={personal_video}
            controls={true}
            loop={false}
            playsinline
          />
          <div className='pitch_container-about-me'>
            {about_me}
          </div>
      </div>
    </>
  )

}
