import React from 'react';
import './video-thumbnail.style.scss';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
export default function VideoThumbnail({
  hovered,
  background,
  text,
  onMouseEnter,
  onMouseLeave,
  id,
  user,
  views,
  created_at
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="video-thumbnail"
    >
      <Link to={`/video/${id}`}>
        <div className="video-thumbnail-img-wrap">
          <img className="video-thumbnail-img" src={background} alt="" />
          {hovered && (
            <div className="video-thumbnail-popup-play">
              <div>
                <AiFillPlayCircle className="video-thumbnail-popup-play-icon" />
              </div>
              <div className="video-thumbnail-popup-play-title">PLAY</div>
            </div>
          )}
        </div>
        <div className="video-thumbnail-text-wrap">

        <div className="video-thumbnail-text">{text}</div>

        <div className="video-thumbnail-user">By {user}
          <div>{views} views   |   {created_at}</div>
        </div>
        </div>
      </Link>
    </div>
  );
}
