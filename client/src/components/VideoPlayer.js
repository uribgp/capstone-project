import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Player } from 'video-react';
import ReactPlayer from 'react-player';
// import '../../node_modules/video-react/dist/video-react.css'
export default function VideoPlayer(props){
  let video = props.video
  const player = useRef(null)
  const [play, setPlay] = useState(true)
  // let timestamp = useSelector(state => state.videos.timestamp);
  let setTimestamp = props.setTimestamp
  let setFocus = props.setFocus
  function grabTimestamp(){
    let currentTime = player && player.current && player.current.getCurrentTime()
    if (currentTime){
      setTimestamp(currentTime)
    }
  }
  
  function checkProgress(event){
    if(props.comments && props.comments.length > 0){
      for (let comment of props.comments){
        if(Math.round(event.playedSeconds) == comment.timestamp) {
          setPlay(false)
          setFocus(comment.id)
          console.log(Math.round(event.playedSeconds))
          console.log(comment.timestamp)
        }
      }
    }
  }
  
  return (
    <ReactPlayer
    playing={play}
    ref={player}
    url={video.link}
    controls={true}
    playsinline
    onProgress={event => checkProgress(event)}
    onPause={grabTimestamp}
    />
    
  );
};