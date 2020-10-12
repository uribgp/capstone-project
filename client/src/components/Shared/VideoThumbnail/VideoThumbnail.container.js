import React, { useState } from 'react'
import VideoThumbnail from './VideoThumbnail'

export default function VideoThumbnailContainer() {
  const [displayPlayButton, setDisplayPlayButton] = useState(false)
 
  const handleOnMouseEnter = () => {
    setDisplayPlayButton(true)
  }

  const handleOnMouseLeave = () => {
    setDisplayPlayButton(false)
  }
 
  return (
      <VideoThumbnail hovered={displayPlayButton} onMouseLeave={handleOnMouseLeave} onMouseEnter={handleOnMouseEnter} text={"I squat 500kg"} background="https://images.unsplash.com/photo-1602347671057-e2be757b37c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" />

  )
}
