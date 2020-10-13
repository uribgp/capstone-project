import React, { useState } from 'react'
import VideoThumbnail from './VideoThumbnail'

export default function VideoThumbnailContainer({video: {thumbnail, description, link}}) {
  const [displayPlayButton, setDisplayPlayButton] = useState(false)
 
  const handleOnMouseEnter = () => {
    setDisplayPlayButton(true)
  }

  const handleOnMouseLeave = () => {
    setDisplayPlayButton(false)
  }
 
  return (
      <VideoThumbnail hovered={displayPlayButton} onMouseLeave={handleOnMouseLeave} onMouseEnter={handleOnMouseEnter} link={link} text={description} background={thumbnail} />
  )
}
