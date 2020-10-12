import React from 'react';
import './video-thumbnail.style.scss'
import {AiFillPlayCircle} from 'react-icons/ai'
export default function VideoThumbnail({hovered, background, text, onMouseEnter, onMouseLeave}) {
  return (
    <div className="video-thumbnail">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{backgroundImage: `${hovered ? "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))," : "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 0.83%),"}  url(${background})`}}
        className="video-thumbnail-image"
      >
        {hovered && 
        <div className="video-thumbnail-popup-play">
          <div>
          <AiFillPlayCircle className="video-thumbnail-popup-play-icon" />
          </div>
          <div className="video-thumbnail-popup-play-title">
          PLAY

          </div>
        </div>
        }
      </div>
        <div className="video-thumbnail-text">{text}</div>
    </div>
  );
}
