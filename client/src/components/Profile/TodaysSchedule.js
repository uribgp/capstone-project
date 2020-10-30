import React, { useState } from 'react';
import VideoThumbnail from '../Shared/VideoThumbnail/VideoThumbnail';
import "./TodaysSchedule.scss";

export default function TodaysSchedule({ props }) {
  const [displayPlayButton, setDisplayPlayButton] = useState(false);

  const handleOnMouseEnter = () => {
    setDisplayPlayButton(true);
  };

  const handleOnMouseLeave = () => {
    setDisplayPlayButton(false);
  };
  return (
    

    <div className="todays-schedule">
      <div>
        <div className="todays-schedule-title">
          <div className="inner">
          <h1 className="schedule-text">Today's lift: {props.title}</h1>
          <h3 className="desc">{props.description}</h3>
          </div>
        </div>
      </div>
      <div>
      <div className="inner">
      <h1 className="title-notes">Notes for today's lift:</h1>
      <h3 className="desc">{props.notes}</h3>
      </div>
      </div>
      <div>
      {props.old_video && (
        <>
        <h1>Check out the video from your last {props.main_lift} day</h1>
        <VideoThumbnail
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
          created_at={props.old_video.created_at}
        />
        </>
      )}
      </div>
    </div>
  );
}
