import React, { useState } from 'react';
import VideoThumbnail from '../Shared/VideoThumbnail/VideoThumbnail';

export default function TodaysSchedule({ props }) {
  const [displayPlayButton, setDisplayPlayButton] = useState(false)

  const handleOnMouseEnter = () => {
    setDisplayPlayButton(true)
  }

  const handleOnMouseLeave = () => {
    setDisplayPlayButton(false)
  }
  return (
    <div>
      <h1>Today's lift: {props.title}</h1>
      <h3>{props.description}</h3>
      <h3>{props.notes}</h3>
      { props.old_video && <VideoThumbnail
        className="video-thumbnail.container"
        id={props.old_video.id} 
        hovered={displayPlayButton}
        onMouseLeave={handleOnMouseLeave} 
        onMouseEnter={handleOnMouseEnter} 
        user={props.old_video.user} 
        link={props.old_video.link} 
        text={props.old_video.title} 
        background={props.old_video.thumbnail} 
        views={props.old_video.total_views} 
        created_at={props.old_video.created_at} />}
    </div>
  )
}