import React from 'react';
import { Player } from 'video-react';
import '../../node_modules/video-react/dist/video-react.css'


export default function VideoPlayer() {
  return (
    <Player
      playsInline
      poster="/assets/poster.png"
      src="https://capstone-project-steven.s3-us-west-1.amazonaws.com/555/videos/VID_20201008_212621996.mp4"
    />
  );
};
