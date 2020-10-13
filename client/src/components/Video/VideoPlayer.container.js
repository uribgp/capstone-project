import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { getVideoById } from '../../store/video/video-actions';
import { getComments } from '../../store/comment/comment-actions';
import {useParams} from 'react-router-dom'
import VideoComment from './VideoComment';
export default function VideoPlayerContainer() {

    
      const player = useRef(null)
      const [play, setPlay] = useState(true)
      const [commentsToDisplay, setCommentsToDisplay] = useState([])
      const [secondsPlayed, setSecondsPlayed] = useState(0)
      const dispatch = useDispatch()  
      const {id} = useParams()
      const firstMount = useRef(true)
      const video = useSelector(state => state.videos.video)
      const comments = useSelector(state => state.comments.comments)
      // let timestamp = useSelector(state => state.videos.timestamp);
    

      useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getComments(id))
        .then((res) => console.log(res))
      }, [])

      function grabTimestamp(){
        let currentTime = player && player.current && player.current.getCurrentTime()
        if (currentTime){
    /*       setTimestamp(currentTime) */
        }
      }

      const findWhichCommentsToDisplay = (videoTimeInSeconds) => {
          const commentsWithSameTimestampAsVideotime = []
        for(let i = 0; i < comments.length; i++) {
          console.log(parseInt(comments[i].timestamp))
          if(parseInt(comments[i].timestamp) === videoTimeInSeconds) {
              commentsWithSameTimestampAsVideotime.push(comments[i].id)
          }
        }

        setCommentsToDisplay(commentsWithSameTimestampAsVideotime)
      }
      
      function handleOnProgress(event) { 
        const videoTimeRoundedToSeconds = Math.floor(event.playedSeconds)


        // Make sure the callback only runs once for each second.
        if(videoTimeRoundedToSeconds === secondsPlayed) {
          return
        } 
        setSecondsPlayed(videoTimeRoundedToSeconds)


        // Check if theres a timestamp at current play time of video.
        for(let i = 0; i < comments.length; i++) {
          if(parseInt(comments[i].timestamp) === videoTimeRoundedToSeconds) {
            setPlay(false)
            return findWhichCommentsToDisplay(videoTimeRoundedToSeconds)
          }
        }
      }

      const handleOnPlayClick = () => {
        setPlay(true)
        setCommentsToDisplay([])
      }

      const handleOnEnded = () => {
        setCommentsToDisplay([])
      }
      useEffect(() => {
        if(firstMount.current) {
          firstMount.current = false
        }
      }, [])

      if(!comments || !video) {
        return <div>loading</div>
      }
      
       console.log(commentsToDisplay)
      return (
        <div>
          <ReactPlayer
          progressInterval={1000}
          onPlay={handleOnPlayClick}
          onEnded={handleOnEnded}
          playing={play}
          ref={player}
          url={video.link}
          controls={true}
          loop={false}
          playsinline
          onProgress={event => handleOnProgress(event)}
          onPause={grabTimestamp}
          />
          
        {comments.map(({text, timestamp, id}) => {
          return <div>
      <VideoComment active={commentsToDisplay.includes(id)} comment={text} timestamp={timestamp} />
          </div>
        })}
        </div>
      )};
    
    

