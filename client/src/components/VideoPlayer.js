
import React, { useEffect, useRef, setState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router";
// import { Player } from 'video-react';
import ReactPlayer from 'react-player';
// import '../../node_modules/video-react/dist/video-react.css'

export default function VideoPlayer(props){
  const dispatch = useDispatch();
  let video = props.video
  const player = useRef(null)
  // let timestamp = useSelector(state => state.videos.timestamp);
  let setTimestamp = props.setTimestamp
  function click(){
    player.playing = false
  }

  console.log(player)
  function grabTimestamp(){
    let currentTime = player && player.current && player.current.getCurrentTime()
    if (currentTime){
      setTimestamp(currentTime)
    }
  }

  function checkProgress(){
    console.log(Math.round(player.current.getCurrentTime()))
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
