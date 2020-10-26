import React from 'react'
import VideoThumbnailContainer from '../VideoThumbnail/VideoThumbnail.container'
import ButtonLongBorder from '../Button/ButtonLongBorder'
import './video-section.style.scss'
export default function VideoSection({videos, onViewMoreClick, sectionTitle}) {
  return (
    <div className="video-section">
      <div className="video-section-title">{sectionTitle}</div>
      <div className="video-section-videos">
      {videos.map((video) => {
        return <VideoThumbnailContainer key={video.id} video={video} /> 
      })}
      </div>
    <div className="video-section-view-more">
      <ButtonLongBorder text="View more" onClick={onViewMoreClick} />
    </div>
    </div>
  )
}
