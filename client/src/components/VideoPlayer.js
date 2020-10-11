
import React, { useEffect, useRef, setState } from 'react';
import { useSelector } from 'react-redux';
// import { Player } from 'video-react';
import ReactPlayer from 'react-player';
// import '../../node_modules/video-react/dist/video-react.css'

export default function VideoPlayer(props){
  let video = props.video
  const player = useRef(null)
  // let timestamp = useSelector(state => state.videos.timestamp);
  let setTimestamp = props.setTimestamp
  function click(){
    player.playing = false
  }

  function grabTimestamp(){
    let currentTime = player && player.current && player.current.getCurrentTime()
    if (currentTime){
      setTimestamp(currentTime)
    }
  }


  function checkProgress(){
    let currentTime = Math.round(player.current.getCurrentTime())
    if(props.comments && props.comments.length > 0){
      for (let comment of props.comments){
        if(currentTime == comment.timestamp){
          props.setFocus(comment.id)
        }
      }
    }
  }
  
  return (
    <ReactPlayer
    onClick={click}
    ref={player}
    url={video.link}
    controls={true}
    playsinline
    onProgress={checkProgress}
    onPause={grabTimestamp}
    />
    
  );
};
